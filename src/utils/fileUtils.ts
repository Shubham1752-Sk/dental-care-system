import type { FileAttachment } from "@/types"

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

export const createFileAttachment = async (file: File): Promise<FileAttachment> => {
  const base64 = await convertFileToBase64(file)
  return {
    id: crypto.randomUUID(), // or generate ID however you prefer
    name: file.name,
    url: base64,
    type: file.type,
    size: file.size,
    uploadedAt: new Date(),
  }
}

export const downloadFile = (fileAttachment: FileAttachment) => {
  const link = document.createElement("a")
  link.href = fileAttachment.url
  link.download = fileAttachment.name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export const isImageFile = (file: FileAttachment): boolean => {
  return file.type.startsWith("image/")
}

export const isPDFFile = (file: FileAttachment): boolean => {
  return file.type === "application/pdf"
}
