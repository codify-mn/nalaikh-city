import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seed() {
  console.log('🌱 Starting database seed...')

  try {
    const payload = await getPayload({ config })

    // Check if admin user already exists
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
      where: {
        email: {
          equals: 'admin@ncdc.mn'
        }
      }
    })

    if (existingUsers.docs.length > 0) {
      console.log('ℹ️  Admin user already exists')
    } else {

    // Create default admin user
    const adminUser = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@ncdc.mn',
        password: 'admin123',
        firstName: 'НХХК',
        lastName: 'Админ',
        role: 'admin',
      }
    })

      console.log('✅ Created admin user:', {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role
      })
    }

    // Create sample posts if none exist
    const existingPosts = await payload.find({
      collection: 'posts',
      limit: 1
    })

    if (existingPosts.docs.length === 0) {
      console.log('📝 Creating sample posts...')
      
      const samplePosts = [
        {
          title: 'Налайх хотын шинэ төслүүд',
          slug: 'nalaikh-hot-shine-tosluud',
          author: 'НХХК Админ',
          excerpt: 'Налайх хотын хөгжлийн шинэ төслүүдийн талаар мэдээлэл',
          content: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      format: 0,
                      style: '',
                      mode: 'normal',
                      text: 'Налайх хотын хөгжлийн корпораци шинэ төслүүдээ танилцуулж байна. Эдгээр төслүүд нь хотын инфрастурктур, орон сууц, ногоон байгууламжийг сайжруулахад чиглэгдэж байна.',
                      version: 1
                    }
                  ],
                  direction: 'ltr'
                }
              ],
              direction: 'ltr'
            }
          },
          category: 'projects',
          status: 'published',
          tags: ['төсөл', 'хөгжил', 'инфрастурктур'],
          publishedDate: new Date().toISOString(),
          seo: {
            title: 'Налайх хотын шинэ төслүүд - НХХК',
            description: 'Налайх хотын хөгжлийн шинэ төслүүдийн талаар дэлгэрэнгүй мэдээлэл'
          }
        },
        {
          title: 'Ногоон хөгжлийн санаачилга',
          slug: 'nogoon-hog-jil-sanaachilga',
          author: 'НХХК Админ',
          excerpt: 'Байгаль орчинд ээлтэй хөгжлийн стратеги',
          content: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      format: 0,
                      style: '',
                      mode: 'normal',
                      text: 'Налайх хот байгаль орчинд ээлтэй хөгжлийн замыг сонгож, ногоон технологи, тогтвортой хөгжлийн зарчмуудыг баримталж байна.',
                      version: 1
                    }
                  ],
                  direction: 'ltr'
                }
              ],
              direction: 'ltr'
            }
          },
          category: 'green-development',
          status: 'published',
          tags: ['ногоон технologi', 'тогтвортой хөгжил', 'байгаль орчин'],
          publishedDate: new Date().toISOString(),
          seo: {
            title: 'Ногоон хөгжлийн санаачилга - НХХК',
            description: 'Байгаль орчинд ээлтэй хөгжлийн стратеги ба санаачилгууд'
          }
        }
      ]

      for (const postData of samplePosts) {
        await payload.create({
          collection: 'posts',
          data: postData
        })
      }

      console.log('✅ Created sample posts')
    }

    console.log('🎉 Database seed completed successfully!')
    console.log('')
    console.log('📋 Default credentials:')
    console.log('   Email: admin@ncdc.mn')
    console.log('   Password: admin123')
    console.log('')
    console.log('🔗 Login at: http://localhost:3000/login')

  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }

  process.exit(0)
}

seed()