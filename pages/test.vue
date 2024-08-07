<template>

    <div>
          <input type="file" @input="handleFileInput" />
    <button @click="submit">submit</button>
    </div>
  
</template>

<script setup>
const { handleFileInput, files } = useFileStorage()

const submit = async () => {
    const response = await $fetch('/api/files', {
        method: 'POST',
        body: {
            files: files.value
        }
    })
    console.log(response);
    
}
</script>


<style lang="scss" scoped>

</style>