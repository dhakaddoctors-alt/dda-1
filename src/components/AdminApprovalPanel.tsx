"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type PendingMember = {
  id: string;
  fullName: string;
  organization: string | null;
  phone: string | null;
  address: string | null;
  registrationNumber: string | null;
  email: string | null;
  createdAt: Date | null;
};

export default function AdminApprovalPanel({ members }: { members: PendingMember[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  async function handleApprove(memberId: string) {
    setPendingId(memberId);
    setError(null);

    try {
      const response = await fetch("/api/admin/approvals", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ memberId }),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Approval failed.");
      }

      startTransition(() => {
        router.refresh();
      });
    } catch (approvalError) {
      setError(approvalError instanceof Error ? approvalError.message : "Approval failed.");
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Pending Approvals</h2>
          <p className="text-sm text-slate-500 mt-1">Approve new members to make them visible in the directory.</p>
        </div>
        <div className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          {members.length} pending
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-4">
          {error}
        </div>
      ) : null}

      {members.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-10 text-center text-slate-500">
          No approvals waiting.
        </div>
      ) : (
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="rounded-2xl border border-slate-200 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <div>
                    <p className="text-lg font-bold text-slate-900">{member.fullName}</p>
                    <p className="text-sm text-blue-600 font-medium">{member.organization || "Member applicant"}</p>
                  </div>
                  <p className="text-sm text-slate-600">{member.email || member.phone || "No contact provided"}</p>
                  <p className="text-sm text-slate-500">{member.address || "No address provided"}</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    {member.registrationNumber || "Registration pending"} {member.createdAt ? `• ${new Date(member.createdAt).toLocaleDateString("en-US")}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleApprove(member.id)}
                  disabled={pendingId === member.id}
                  className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {pendingId === member.id ? "Approving..." : "Approve Member"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
