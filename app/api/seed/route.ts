import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const results: string[] = []

  try {
    const payload = await getPayload({ config: configPromise })

    // --- Seed admin user ---
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
      where: { email: { equals: 'admin@ncdc.mn' } },
    })

    if (existingUsers.docs.length > 0) {
      results.push('Admin user already exists')
    } else {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@ncdc.mn',
          password: 'admin123',
          firstName: 'НХХК',
          lastName: 'Админ',
          role: 'admin',
        },
      })
      results.push('Created admin user')
    }

    // --- Seed posts ---
    const existingPosts = await payload.find({ collection: 'posts', limit: 1 })

    if (existingPosts.docs.length > 0) {
      results.push('Posts already exist, skipping')
    } else {
      const samplePosts = [
        {
          title: 'Налайх хотын шинэ төслүүд',
          slug: 'nalaikh-hot-shine-tosluud',
          author: 'НХХК Админ',
          excerpt: 'Налайх хотын хөгжлийн шинэ төслүүдийн талаар мэдээлэл',
          content: {
            root: {
              type: 'root', format: '', indent: 0, version: 1,
              children: [{
                type: 'paragraph', format: '', indent: 0, version: 1,
                children: [{ type: 'text', format: 0, style: '', mode: 'normal', version: 1,
                  text: 'Налайх хотын хөгжлийн корпораци шинэ төслүүдээ танилцуулж байна. Эдгээр төслүүд нь хотын инфрастурктур, орон сууц, ногоон байгууламжийг сайжруулахад чиглэгдэж байна.',
                }],
                direction: 'ltr',
              }],
              direction: 'ltr',
            },
          },
          category: 'projects',
          status: 'published',
          tags: ['төсөл', 'хөгжил', 'инфрастурктур'],
          publishedDate: new Date().toISOString(),
          seo: { title: 'Налайх хотын шинэ төслүүд - НХХК', description: 'Налайх хотын хөгжлийн шинэ төслүүдийн талаар дэлгэрэнгүй мэдээлэл' },
        },
        {
          title: 'Ногоон хөгжлийн санаачилга',
          slug: 'nogoon-hog-jil-sanaachilga',
          author: 'НХХК Админ',
          excerpt: 'Байгаль орчинд ээлтэй хөгжлийн стратеги',
          content: {
            root: {
              type: 'root', format: '', indent: 0, version: 1,
              children: [{
                type: 'paragraph', format: '', indent: 0, version: 1,
                children: [{ type: 'text', format: 0, style: '', mode: 'normal', version: 1,
                  text: 'Налайх хот байгаль орчинд ээлтэй хөгжлийн замыг сонгож, ногоон технологи, тогтвортой хөгжлийн зарчмуудыг баримталж байна.',
                }],
                direction: 'ltr',
              }],
              direction: 'ltr',
            },
          },
          category: 'green-development',
          status: 'published',
          tags: ['ногоон технологи', 'тогтвортой хөгжил', 'байгаль орчин'],
          publishedDate: new Date().toISOString(),
          seo: { title: 'Ногоон хөгжлийн санаачилга - НХХК', description: 'Байгаль орчинд ээлтэй хөгжлийн стратеги ба санаачилгууд' },
        },
      ]

      for (const postData of samplePosts) {
        await payload.create({ collection: 'posts', data: postData })
      }
      results.push('Created 2 sample posts')
    }

    // --- Seed jobs ---
    const existingJobs = await payload.find({ collection: 'jobs', limit: 1 })

    if (existingJobs.docs.length > 0) {
      results.push('Jobs already exist, skipping')
    } else {
      const jobsData = [
        {
          sortOrder: 1, openings: 2, icon: 'ruler', status: 'open',
          mn: { title: 'Архитектор', department: 'Зураг, төслийн газар', purpose: 'Барилга байгууламжийн архитектурын зураг төсөл боловсруулах, төслийн стандарт шаардлагыг хангаж хэрэгжүүлэх, барилгын уран сайхны болон функциональ шийдлийг оновчтой төлөвлөх.',
            duties: ['Барилга байгууламжийн архитектурын зураг төсөл боловсруулах', 'Барилгын концепц, төлөвлөлт, интерьер/экстерьер шийдэл гаргах', 'Зураг төслийг үндэсний стандарт, норм дүрэм-ийн дагуу боловсруулах', 'Инженерийн багтай уялдаа холбоотой ажиллах', 'Төслийн явцын техникийн тайлан, баримт бичиг боловсруулах'],
            requirements: ['Архитектур мэргэжлээр бакалавр болон түүнээс дээш зэрэгтэй', 'AutoCAD, Revit, SketchUp зэрэг програм дээр ажиллах чадвартай', 'Барилгын норм дүрэм, стандартын мэдлэгтэй', 'Багаар ажиллах чадвартай'] },
          en: { title: 'Architect', department: 'Design & Project Department', purpose: 'Develop architectural designs for buildings and structures, ensure compliance with project standards, and create optimal aesthetic and functional solutions.',
            duties: ['Develop architectural designs for buildings and structures', 'Create building concepts, layouts, interior/exterior solutions', 'Prepare designs in accordance with national standards and regulations', 'Coordinate with the engineering team', 'Prepare technical reports and project documentation'],
            requirements: ["Bachelor's degree or higher in Architecture", 'Proficient in AutoCAD, Revit, SketchUp', 'Knowledge of building codes and standards', 'Ability to work in a team'] },
          zh: { title: '建筑师', department: '设计与项目部', purpose: '制定建筑设计方案，确保符合项目标准要求，优化建筑美学与功能设计。',
            duties: ['制定建筑设计方案', '创建建筑概念、布局、室内外设计方案', '按照国家标准和法规编制设计文件', '与工程团队协调配合', '编写技术报告和项目文件'],
            requirements: ['建筑学本科及以上学历', '熟练使用AutoCAD、Revit、SketchUp', '熟悉建筑规范和标准', '具备团队合作能力'] },
        },
        {
          sortOrder: 2, openings: 2, icon: 'hardhat', status: 'open',
          mn: { title: 'Барилгын инженер', department: 'Зураг, төслийн газар', purpose: 'Барилгын угсралтын ажлыг техникийн зураг төсөл, норм стандартын дагуу зохион байгуулж, барилгын чанар аюулгүй байдлыг хангах.',
            duties: ['Барилгын угсралтын ажлыг төлөвлөх, зохион байгуулах', 'Барилгын техникийн зураг төслийг хэрэгжүүлэх', 'Барилгын чанарын хяналт хийх', 'Материалын тооцоо, хэрэглээний хяналт хийх', 'Талбай дээр ажилчдын аюулгүй ажиллагааг хангах'],
            requirements: ['Иргэний ба үйлдвэрлэлийн барилгын инженер мэргэжилтэй', 'Барилгын зураг унших чадвартай', 'Барилгын норм, стандартын мэдлэгтэй', 'Талбай дээр ажиллах туршлагатай'] },
          en: { title: 'Construction Engineer', department: 'Design & Project Department', purpose: 'Organize construction and assembly work in accordance with technical designs and standards, ensuring quality and safety.',
            duties: ['Plan and organize construction and assembly work', 'Implement technical construction designs', 'Conduct quality control inspections', 'Manage material calculations and usage', 'Ensure worker safety on site'],
            requirements: ['Degree in Civil or Industrial Construction Engineering', 'Ability to read construction drawings', 'Knowledge of building codes and standards', 'On-site work experience'] },
          zh: { title: '建筑工程师', department: '设计与项目部', purpose: '按照技术设计和标准组织施工安装工作，确保质量和安全。',
            duties: ['规划和组织施工安装工作', '执行技术施工设计', '进行质量控制检查', '管理材料计算和使用', '确保现场工人安全'],
            requirements: ['土木或工业建筑工程专业学历', '能够阅读施工图纸', '熟悉建筑规范和标准', '具有现场工作经验'] },
        },
        {
          sortOrder: 3, openings: 2, icon: 'droplets', status: 'open',
          mn: { title: 'Ус хангамж, ариутгах татуургын инженер', department: 'Зураг, төслийн газар', purpose: 'Барилга байгууламжийн ус хангамж, ариутгах татуургын системийг төлөвлөх, зураг төсөл боловсруулах, угсралтын ажлыг хянах.',
            duties: ['Ус хангамж, бохир усны системийн зураг төсөл боловсруулах', 'Сантехникийн тооцоо, гидравлик тооцоолол хийх', 'Барилгын сантехникийн угсралтын ажлыг хянах', 'Системийн туршилт, ашиглалтанд оруулах ажилд оролцох', 'Усны хэрэглээ, шугам сүлжээний найдвартай ажиллагааг хангах'],
            requirements: ['Ус хангамж, ариутгах татуурга мэргэжлээр төгссөн', 'AutoCAD болон инженерийн програм дээр ажиллах чадвартай', 'Шугам сүлжээний тооцоолол хийх чадвартай'] },
          en: { title: 'Plumbing Engineer', department: 'Design & Project Department', purpose: 'Design water supply and sewage systems for buildings, develop project plans, and supervise installation work.',
            duties: ['Develop water supply and sewage system designs', 'Perform plumbing and hydraulic calculations', 'Supervise plumbing installation work', 'Participate in system testing and commissioning', 'Ensure reliable operation of water networks'],
            requirements: ['Degree in Water Supply & Sewage Engineering', 'Proficient in AutoCAD and engineering software', 'Ability to perform pipeline network calculations'] },
          zh: { title: '给排水工程师', department: '设计与项目部', purpose: '设计建筑给排水系统，编制项目方案，监督安装工作。',
            duties: ['编制给排水系统设计方案', '进行管道和水力计算', '监督管道安装工作', '参与系统测试和调试', '确保供水管网可靠运行'],
            requirements: ['给排水工程专业学历', '熟练使用AutoCAD及工程软件', '能够进行管网计算'] },
        },
        {
          sortOrder: 4, openings: 2, icon: 'thermometer', status: 'open',
          mn: { title: 'Дулааны инженер', department: 'Зураг, төслийн газар', purpose: 'Барилгын халаалт, агаар сэлгэлт, дулаан хангамжийн системийг төлөвлөх, зураг төсөл боловсруулах, системийн хэвийн ажиллагааг хангах.',
            duties: ['Барилгын дулаан хангамжийн системийн зураг төсөл боловсруулах', 'Халаалт, агааржуулалтын тооцоо хийх', 'Системийн угсралтын ажилд хяналт тавих', 'Дулааны тоног төхөөрөмжийн сонголт хийх', 'Ашиглалтын үр ашиг, эрчим хүчний хэмнэлт тооцох'],
            requirements: ['Дулаан хангамж, HVAC инженер мэргэжилтэй', 'Дулааны тооцоолол хийх чадвартай', 'AutoCAD болон инженерийн програм ашиглах чадвартай'] },
          en: { title: 'HVAC Engineer', department: 'Design & Project Department', purpose: 'Design heating, ventilation, and heat supply systems for buildings, develop project plans, and ensure normal system operation.',
            duties: ['Develop heating system designs for buildings', 'Perform heating and ventilation calculations', 'Supervise system installation work', 'Select heating equipment', 'Calculate operational efficiency and energy savings'],
            requirements: ['Degree in Heating/HVAC Engineering', 'Ability to perform thermal calculations', 'Proficient in AutoCAD and engineering software'] },
          zh: { title: '暖通工程师', department: '设计与项目部', purpose: '设计建筑供暖、通风和供热系统，编制项目方案，确保系统正常运行。',
            duties: ['编制建筑供热系统设计方案', '进行供暖和通风计算', '监督系统安装工作', '选择供热设备', '计算运营效率和节能效果'],
            requirements: ['暖通工程专业学历', '能够进行热力计算', '熟练使用AutoCAD及工程软件'] },
        },
        {
          sortOrder: 5, openings: 1, icon: 'calculator', status: 'open',
          mn: { title: 'Барилгын төсөвчин', department: 'Зураг, төслийн газар', purpose: 'Барилгын төслийн өртөг зардлыг тооцоолж, төсөв боловсруулах, төслийн санхүүгийн хяналтыг хэрэгжүүлэх.',
            duties: ['Барилгын төсөв, өртгийн тооцоо боловсруулах', 'Материал, ажиллах хүчний зардал тооцох', 'Тендерийн үнэлгээ, тооцоолол хийх', 'Төслийн санхүүгийн хяналт тавих', 'Барилгын ажлын гүйцэтгэлийн акт боловсруулах'],
            requirements: ['Барилгын эдийн засаг, инженер мэргэжилтэй', 'Estimator, Excel зэрэг програм дээр ажиллах чадвартай', 'Төсөв норм, үнэлгээний мэдлэгтэй'] },
          en: { title: 'Quantity Surveyor', department: 'Design & Project Department', purpose: 'Calculate project costs, prepare budgets, and implement financial oversight for construction projects.',
            duties: ['Prepare construction budgets and cost estimates', 'Calculate material and labor costs', 'Perform tender evaluations and calculations', 'Oversee project financial controls', 'Prepare construction work completion reports'],
            requirements: ['Degree in Construction Economics or Engineering', 'Proficient in Estimator, Excel', 'Knowledge of budgeting norms and valuations'] },
          zh: { title: '工程造价师', department: '设计与项目部', purpose: '计算项目成本，编制预算，实施施工项目的财务监控。',
            duties: ['编制施工预算和成本估算', '计算材料和人工成本', '进行招标评估和计算', '监督项目财务控制', '编制施工完工报告'],
            requirements: ['工程经济或工程专业学历', '熟练使用Estimator、Excel', '熟悉预算规范和估价知识'] },
        },
      ]

      for (const job of jobsData) {
        const created = await payload.create({
          collection: 'jobs',
          locale: 'mn',
          data: {
            title: job.mn.title, department: job.mn.department, purpose: job.mn.purpose,
            openings: job.openings, icon: job.icon, status: job.status, sortOrder: job.sortOrder,
            duties: job.mn.duties.map((d) => ({ duty: d })),
            requirements: job.mn.requirements.map((r) => ({ requirement: r })),
          },
        })

        await payload.update({
          collection: 'jobs', id: created.id, locale: 'en',
          data: {
            title: job.en.title, department: job.en.department, purpose: job.en.purpose,
            duties: job.en.duties.map((d) => ({ duty: d })),
            requirements: job.en.requirements.map((r) => ({ requirement: r })),
          },
        })

        await payload.update({
          collection: 'jobs', id: created.id, locale: 'zh',
          data: {
            title: job.zh.title, department: job.zh.department, purpose: job.zh.purpose,
            duties: job.zh.duties.map((d) => ({ duty: d })),
            requirements: job.zh.requirements.map((r) => ({ requirement: r })),
          },
        })

        results.push(`Created job: ${job.mn.title} (${job.en.title})`)
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
