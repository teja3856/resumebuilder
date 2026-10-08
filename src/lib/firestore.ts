/**
 * firestore.ts
 * Cloud data persistence layer using Firebase Firestore.
 *
 * Data structure:
 *   users/{userId}/resumes/{resumeId}   — one Firestore doc per resume
 *   users/{userId}/meta/session         — stores lastActiveResumeId
 *
 * All functions are no-ops (safe) when user is not logged in.
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { ResumeData } from '../types/resume';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const resumesCol = (userId: string) =>
  collection(db, 'users', userId, 'resumes');

const resumeDoc = (userId: string, resumeId: string) =>
  doc(db, 'users', userId, 'resumes', resumeId);

const metaDoc = (userId: string) =>
  doc(db, 'users', userId, 'meta', 'session');

// ─── Save all resumes to cloud ────────────────────────────────────────────────
/**
 * Upserts every resume in the array as its own Firestore document.
 * Called on login sync and periodic background saves.
 */
export async function saveResumesToCloud(
  userId: string,
  resumes: ResumeData[]
): Promise<void> {
  if (!isFirebaseConfigured || !userId) return;
  const writes = resumes.map((resume) =>
    setDoc(resumeDoc(userId, resume.id), {
      ...resume,
      _syncedAt: serverTimestamp()
    })
  );
  await Promise.all(writes);
}

// ─── Save a single resume to cloud ───────────────────────────────────────────
/**
 * Upserts a single resume document. Used for incremental saves during editing.
 */
export async function saveResumeToCloud(
  userId: string,
  resume: ResumeData
): Promise<void> {
  if (!isFirebaseConfigured || !userId) return;
  await setDoc(resumeDoc(userId, resume.id), {
    ...resume,
    _syncedAt: serverTimestamp()
  });
}

// ─── Load all resumes from cloud ─────────────────────────────────────────────
/**
 * Fetches all resume documents for this user.
 * Returns null if Firestore is not configured or the user has no cloud data.
 */
export async function loadResumesFromCloud(
  userId: string
): Promise<ResumeData[] | null> {
  if (!isFirebaseConfigured || !userId) return null;
  try {
    const snap = await getDocs(resumesCol(userId));
    if (snap.empty) return null;

    const resumes: ResumeData[] = snap.docs.map((d) => {
      const data = d.data();
      // Remove Firestore-only fields before returning as ResumeData
      const { _syncedAt, ...resumeData } = data;
      return resumeData as ResumeData;
    });

    // Sort by most recently updated first
    return resumes.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  } catch (err) {
    console.error('[Firestore] Failed to load resumes:', err);
    return null;
  }
}

// ─── Delete a single resume from cloud ───────────────────────────────────────
/**
 * Deletes a resume document from Firestore when the user deletes a resume locally.
 */
export async function deleteResumeFromCloud(
  userId: string,
  resumeId: string
): Promise<void> {
  if (!isFirebaseConfigured || !userId) return;
  try {
    await deleteDoc(resumeDoc(userId, resumeId));
  } catch (err) {
    console.error('[Firestore] Failed to delete resume:', err);
  }
}

// ─── Session: persist last-active resume ─────────────────────────────────────
/**
 * Saves the ID of the resume the user was last editing.
 * Loaded on next login to open the right resume automatically.
 */
export async function saveLastActiveResumeId(
  userId: string,
  resumeId: string
): Promise<void> {
  if (!isFirebaseConfigured || !userId) return;
  try {
    await setDoc(metaDoc(userId), {
      lastActiveResumeId: resumeId,
      lastSeenAt: serverTimestamp()
    });
  } catch (err) {
    console.error('[Firestore] Failed to save session meta:', err);
  }
}

/**
 * Loads the last-active resume ID from Firestore.
 * Returns null if none was saved.
 */
export async function loadLastActiveResumeId(
  userId: string
): Promise<string | null> {
  if (!isFirebaseConfigured || !userId) return null;
  try {
    const snap = await getDoc(metaDoc(userId));
    if (!snap.exists()) return null;
    return snap.data().lastActiveResumeId ?? null;
  } catch (err) {
    console.error('[Firestore] Failed to load session meta:', err);
    return null;
  }
}
