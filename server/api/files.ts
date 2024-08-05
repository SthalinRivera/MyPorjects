export default defineEventHandler(async (event) => {
    const { files } = await readBody<{ files: File[] }>(event)

    for (const file of files) {
      await storeFileLocally(
            file,
            12,
            '/upload'
        )
    }
    return files;
})

interface File {
    name: string
    content: string
}
