"use server";

import { cookies } from "next/headers";

export default async function UpdateProject(
  id: string,
  name: string,
  description: string,
  alertflowRunners: boolean,
  icon: string,
  color: string,
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
    const res = await fetch(`${process.env.API_ENDPOINT}/projects/${id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        name: name,
        description: description,
        alertflow_runners: alertflowRunners,
        icon: icon,
        color: color,
      }),
    });
    const data = await res.json();

    return data;
  } catch (error) {
    return { error: "Failed to update project" };
  }
}
