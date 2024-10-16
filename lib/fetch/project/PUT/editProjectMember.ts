"use server";

import { cookies } from "next/headers";

export default async function EditProjectMember(
  id: string,
  role: string,
  user_id: string,
) {
  "use client";
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;

  try {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    if (token) {
      headers.append("Authorization", token);
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/projects/${id}/member`,
      {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({
          user_id: user_id,
          role: role,
        }),
      },
    );
    const data = await res.json();

    return data;
  } catch (error) {
    return { error: "Failed to update project member" };
  }
}
