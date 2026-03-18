import { desc, eq } from "drizzle-orm";
import { members, users } from "@/db/schema";
import { getRuntimeDb, toPublicR2Url } from "@/lib/cloudflare";

export async function listApprovedMembers() {
  const db = getRuntimeDb();
  const rows = await db
    .select({
      id: members.id,
      fullName: members.fullName,
      organization: members.organization,
      phone: members.phone,
      address: members.address,
      registrationNumber: members.registrationNumber,
      photoUrl: members.photoUrl,
      isApproved: members.isApproved,
      email: users.email,
      role: users.role,
    })
    .from(members)
    .leftJoin(users, eq(users.id, members.userId))
    .where(eq(members.isApproved, true))
    .orderBy(desc(members.createdAt));

  return rows.map((row) => ({
    ...row,
    photoUrl: toPublicR2Url(row.photoUrl),
  }));
}

export async function getMemberForUser(userId: string) {
  const db = getRuntimeDb();
  const [row] = await db
    .select({
      id: members.id,
      fullName: members.fullName,
      organization: members.organization,
      phone: members.phone,
      address: members.address,
      registrationNumber: members.registrationNumber,
      photoUrl: members.photoUrl,
      isApproved: members.isApproved,
      createdAt: members.createdAt,
      email: users.email,
      role: users.role,
    })
    .from(members)
    .leftJoin(users, eq(users.id, members.userId))
    .where(eq(members.userId, userId))
    .limit(1);

  if (!row) {
    return null;
  }

  return {
    ...row,
    photoUrl: toPublicR2Url(row.photoUrl),
  };
}

export async function listPendingMembers() {
  const db = getRuntimeDb();
  const rows = await db
    .select({
      id: members.id,
      userId: members.userId,
      fullName: members.fullName,
      organization: members.organization,
      phone: members.phone,
      address: members.address,
      registrationNumber: members.registrationNumber,
      photoUrl: members.photoUrl,
      createdAt: members.createdAt,
      email: users.email,
      role: users.role,
    })
    .from(members)
    .leftJoin(users, eq(users.id, members.userId))
    .where(eq(members.isApproved, false))
    .orderBy(desc(members.createdAt));

  return rows.map((row) => ({
    ...row,
    photoUrl: toPublicR2Url(row.photoUrl),
  }));
}

export async function approveMember(memberId: string) {
  const db = getRuntimeDb();
  await db.update(members).set({ isApproved: true }).where(eq(members.id, memberId));
}
