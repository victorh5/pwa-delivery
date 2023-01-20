import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const firstUserId = '0730ffac-d039-4194-9571-01aa2aa0efbd'
const secondUserId = '00880d75-a933-4fef-94ab-e05744435297'
const thirdUserId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00'
const fourthUserId = 'fb2c2bcf-3d87-4626-8c0d-d7fd1255ac00'

async function run() {
  await prisma.user.deleteMany()
  
  await Promise.all([
    await prisma.user.create({
      data: {
        id: firstUserId,
        name: 'Victor Hugo',
        email: 'victorh5900@gmail.com',
        password: 'victor10',
        address: {
          create: {
            cep: '79034-240',
            street: 'Rua Jorge Pedro Bedoglim',
            number: 1282,
            city: 'Campo Grande',
            state: 'Mato Grosso do Sul',
            complement: 'Casa de portão branco'
          }
        },
        phone: {
          create: {
            number: '(67) 98159-6482'
          }
        },
        profile_image: 'https://instagram.fcgr8-1.fna.fbcdn.net/v/t51.2885-19/316923514_201302118938796_954919540150157949_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fcgr8-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=p6QsT1GnvK4AX9aKUbt&edm=ACWDqb8BAAAA&ccb=7-5&oh=00_AfD1IVso1fEtLY5I_5QG5oQGay5NNKtllfeNzGaVo8muHw&oe=63CCD993&_nc_sid=1527a3',
        createdAt: new Date('2023-01-19T03:00:00.000z')
      }
    })
  ])
  await prisma.user.create({
    data: {
      id: secondUserId,
      name: 'Matheus Gonçalves Rojas',
      email: 'matheus.jmv@gmail.com',
      password: 'matheus10',
      address: {
        create: {
          cep: '79034-240',
          street: 'Rua Jorge Pedro Bedoglim',
          number: 1282,
          city: 'Campo Grande',
          state: 'Mato Grosso do Sul',
          complement: 'Casa de portão branco'
        }
      },
      phone: {
        create: {
          number: '(67) 94523-5748'
        }
      },
      profile_image: 'https://media.licdn.com/dms/image/C4D03AQG6WDtECJcurw/profile-displayphoto-shrink_800_800/0/1646792799268?e=2147483647&v=beta&t=z5hP3Me-bzwhWJ3tXKZTvT99oB81kzSJo0LPwsY9BTI',
      createdAt: new Date('2023-01-19T03:00:00.000z')
    }
  })
  await prisma.user.create({
    data: {
      id: thirdUserId,
      name: 'Juliano Maciel de Lima',
      email: 'juliano1525@gmail.com',
      password: 'juliano10',
      address: {
        create: {
          cep: '79034-240',
          street: 'Rua Jorge Pedro Bedoglim',
          number: 1282,
          city: 'Campo Grande',
          state: 'Mato Grosso do Sul',
          complement: 'Casa de portão branco'
        }
      },
      phone: {
        create: {
          number: '(67) 95826-6935'
        }
      },
      profile_image: 'https://static.cdninstagram.com/rsrc.php/v3/yx/r/H1l_HHqi4p6.png',
      createdAt: new Date('2023-01-19T03:00:00.000z')
    }
  })
  await prisma.user.create({
    data: {
      id: fourthUserId,
      name: 'Jucilene Gonçalves Mendes Maciel',
      email: 'jucilene.maciel@gmail.com',
      password: 'jucilene10',
      address: {
        create: {
          cep: '79034-240',
          street: 'Rua Jorge Pedro Bedoglim',
          number: 1282,
          city: 'Campo Grande',
          state: 'Mato Grosso do Sul',
          complement: 'Casa de portão branco'
        }
      },
      phone: {
        create: {
          number: '(67) 99900-2057'
        }
      },
      profile_image: 'https://www.enfoquems.com.br/wp-content/uploads/2021/08/559809c3-9d9a-448a-a43d-ec5bca35adc8-1024x682.jpg',
      createdAt: new Date('2023-01-19T03:00:00.000z')
    }
  })
}
run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })