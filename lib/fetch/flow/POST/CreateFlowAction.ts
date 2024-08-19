"use server";

import { cookies } from "next/headers";

export default async function CreateFlowAction(flowID: string, action: any) {
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
      `${process.env.NEXT_PUBLIC_API_URL}/flows/${flowID}/actions`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          ...action,
        }),
      },
    );
    const data = await res.json();

    return data;
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
}
