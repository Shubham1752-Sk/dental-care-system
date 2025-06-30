import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createFileAttachment, downloadFile, formatFileSize, isImageFile, isPDFFile } from "@/utils/fileUtils"
import type { FileAttachment } from "@/types"
import { Upload, X, Download, Eye, FileText, ImageIcon } from "lucide-react"

interface FileUploadProps {
  files: FileAttachment[]
  onFilesChange: (files: FileAttachment[]) => void
}

export default function FileUpload({ files, onFilesChange }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (!selectedFiles) return

    setUploading(true)
    try {
      const newFiles: FileAttachment[] = []

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        const fileAttachment = await createFileAttachment(file)
        newFiles.push(fileAttachment)
      }

      onFilesChange([...files, ...newFiles])
    } catch (error) {
      console.error("Error uploading files:", error)
    } finally {
      setUploading(false)
      // Reset input
      event.target.value = ""
    }
  }

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    onFilesChange(updatedFiles)
  }

  const getFileIcon = (file: FileAttachment) => {
    if (isImageFile(file)) {
      return <ImageIcon className="h-5 w-5 text-blue-600" />
    } else if (isPDFFile(file)) {
      return <FileText className="h-5 w-5 text-red-600" />
    } else {
      return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <input
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
          disabled={uploading}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            {uploading ? "Uploading files..." : "Click to upload files or drag and drop"}
          </p>
          <p className="text-xs text-gray-500 mt-1">Supports images, PDFs, and documents</p>
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Uploaded Files ({files.length})</h4>
          <div className="grid grid-cols-1 gap-2">
            {files.map((file, index) => (
              <Card key={index} className="p-3">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      {getFileIcon(file)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* {isImageFile(file) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                                // Create data URL from base64
                                const dataUrl = `data:${file.type};base64,${file.url.replace(/^data:.*base64,/, '')}`
                                window.open(dataUrl, "_blank")
                            }}
                            title="Preview image"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )} */}

                      <Button size="sm" variant="outline" onClick={() => downloadFile(file)} title="Download file">
                        <Download className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRemoveFile(index)}
                        className="text-red-600 hover:text-red-700"
                        title="Remove file"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Image Preview */}
                  {isImageFile(file) && (
                    <div className="mt-3">
                      <img
                        src={file.url || "/placeholder.svg"}
                        alt={file.name}
                        className="w-full h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
