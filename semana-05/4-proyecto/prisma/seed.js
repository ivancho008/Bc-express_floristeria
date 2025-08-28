const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Sembrando datos de prueba...');

  // Crear usuarios de ejemplo
  const user1 = await prisma.user.create({
    data: {
      name: 'Ana García',
      email: 'ana@example.com'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Carlos López',
      email: 'carlos@example.com'
    }
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'María Rodríguez',
      email: 'maria@example.com'
    }
  });

  console.log('✅ Usuarios creados:', { user1, user2, user3 });

  // Crear posts de ejemplo
  const post1 = await prisma.post.create({
    data: {
      title: 'Introducción a Node.js',
      content: 'Node.js es un entorno de ejecución para JavaScript construido con el motor V8 de Chrome. Permite ejecutar JavaScript en el servidor, lo que lo hace ideal para construir aplicaciones web escalables y eficientes.',
      published: true,
      authorId: user1.id
    }
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Express.js para principiantes',
      content: 'Express.js es un framework web minimalista y flexible para Node.js que proporciona un conjunto robusto de características para aplicaciones web y móviles. Es el estándar de facto para aplicaciones Node.js.',
      published: true,
      authorId: user1.id
    }
  });

  const post3 = await prisma.post.create({
    data: {
      title: 'Base de datos con Prisma',
      content: 'Prisma es un ORM de nueva generación que facilita el trabajo con bases de datos. Proporciona type-safety, migraciones automáticas y una excelente experiencia de desarrollo.',
      published: false,
      authorId: user2.id
    }
  });

  const post4 = await prisma.post.create({
    data: {
      title: 'APIs REST - Mejores prácticas',
      content: 'Las APIs REST son fundamentales en el desarrollo moderno. Algunas mejores prácticas incluyen usar códigos de estado HTTP apropiados, versionado de API, y documentación clara.',
      published: true,
      authorId: user3.id
    }
  });

  const post5 = await prisma.post.create({
    data: {
      title: 'Manejo de errores en Express',
      content: 'Un manejo de errores robusto es crucial para cualquier aplicación. Express proporciona middleware de error que nos permite capturar y manejar errores de manera centralizada.',
      published: true,
      authorId: user2.id
    }
  });

  console.log('✅ Posts creados:', { post1, post2, post3, post4, post5 });

  console.log('🎉 Datos de prueba sembrados exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error sembrando datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
