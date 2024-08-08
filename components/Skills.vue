<template>
    <div class="p-6 ">
      <h3 class="text-center text-2xl font-bold dark:text-white mb-4">A passionate frontend developer from India</h3>
      
      <p class="text-left mt-2 flex flex-wrap gap-4">
        <a
        v-for="(skill, index) in skills"
        :key="index"
        :href="skill.href"
        target="_blank"
        rel="noreferrer"
        class="flex items-center"
      >
        <img :src="skill.src" :alt="skill.alt" width="40" height="40" />
      </a>
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
  
  const skills = ref([
  { href: 'https://aws.amazon.com', src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', alt: 'aws' },
  { href: 'https://www.w3schools.com/css/', src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg', alt: 'css3' },
  { href: 'https://www.docker.com/', src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg', alt: 'docker' },
  { href: 'https://expressjs.com', src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg', alt: 'express' },
  { href: 'https://www.figma.com/', src: 'https://www.vectorlogo.zone/logos/figma/figma-icon.svg', alt: 'figma' },
  { href: 'https://firebase.google.com/', src: 'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg', alt: 'firebase' },
  { href: 'https://cloud.google.com', src: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg', alt: 'gcp' },
  { href: 'https://git-scm.com/', src: 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg', alt: 'git' },
  { href: 'https://www.w3.org/html/', src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg', alt: 'html5' },
  { href: 'https://www.adobe.com/in/products/illustrator.html', src: 'https://www.vectorlogo.zone/logos/adobe_illustrator/adobe_illustrator-icon.svg', alt: 'illustrator' },
  { href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg', alt: 'javascript' },
  { href: 'https://materializecss.com/', src: 'https://raw.githubusercontent.com/prplx/svg-logos/5585531d45d294869c4eaab4d7cf2e9c167710a9/svg/materialize.svg', alt: 'materialize' },
  { href: 'https://www.mongodb.com/', src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg', alt: 'mongodb' },
  { href: 'https://www.mysql.com/', src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg', alt: 'mysql' },
  { href: 'https://nodejs.org', src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg', alt: 'nodejs' },
  { href: 'https://www.oracle.com/', src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/oracle/oracle-original.svg', alt: 'oracle' },
  { href: 'https://www.photoshop.com/en', src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-line.svg', alt: 'photoshop' },
  { href: 'https://www.php.net', src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg', alt: 'php' },
  { href: 'https://www.postgresql.org', src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg', alt: 'postgresql' },
  { href: 'https://www.python.org', src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg', alt: 'python' },
  { href: 'https://reactjs.org/', src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg', alt: 'react' },
  { href: 'https://www.tensorflow.org', src: 'https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg', alt: 'tensorflow' },
  { href: 'https://www.typescriptlang.org/', src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg', alt: 'typescript' },
  { href: 'https://unity.com/', src: 'https://www.vectorlogo.zone/logos/unity3d/unity3d-icon.svg', alt: 'unity' },
  { href: 'https://vuejs.org/', src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original-wordmark.svg', alt: 'vuejs' },
  { href: 'https://vuetifyjs.com/en/', src: 'https://bestofjs.org/logos/vuetify.svg', alt: 'vuetify' },
]);
</script>
