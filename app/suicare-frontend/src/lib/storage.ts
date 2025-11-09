export async function uploadFileViaFormData(file: File, token: string): Promise<string> {
  const form = new FormData();
  form.append("file", file, file.name || "file.bin");

  const res = await fetch("https://api.nft.storage/upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });

  if (!res.ok) throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
  const data = (await res.json()) as { ok: boolean; value?: { cid: string } };
  if (!data.ok || !data.value?.cid) throw new Error("Unexpected response from nft.storage");
  return data.value.cid;
}

