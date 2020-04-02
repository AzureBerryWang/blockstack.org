import React, { useEffect, useCallback } from 'react'
import { Section, Title, Text } from '@components/section'
import { Box, Flex } from 'blockstack-ui'
import { Button } from '@components/button'
import { Sections } from '@components/sections'
import { installSection } from '@components/install'
import { Image } from '@components/image'
import { useHover } from 'use-events'
import { transition } from '@common/theme'
import { useSpring, animated as a } from 'react-spring'
import { useInView } from 'react-intersection-observer'
import { useInViewAnimationStyles } from '@common/hooks'

const meta = {
  path: '/try-blockstack',
  title: 'Try Blockstack',
  custom: true,
  ogTitle: 'Apps that protect your digital rights',
  description: `Blockstack ID provides user-controlled login and storage that enable you to take back control of your identity and data. Creating a Blockstack ID is easy, free, and secure.`
}

const appCards = [
  [
    {
      src: 'https://blockstack-www.imgix.net/app-cards/app-card-bitpatron.png',
      icon: 'https://blockstack-www.imgix.net/apps/bitpatron-app-icon.png',
      name: 'BitPatron',
      description: 'Bitcoin-based Patreon alternative',
      href: 'https://bitpatron.co/'
    },
    {
      src: 'https://blockstack-www.imgix.net/app-cards/app-card-blockvault.png',
      icon: 'https://blockstack-www.imgix.net/apps/blockvault-app-icon.png',
      name: 'Blockvault',
      description: 'Decentralized password manager for teams',
      href: 'https://blockvault.site/'
    },
    {
      src: 'https://blockstack-www.imgix.net/app-cards/app-card-graphite.png',
      icon: 'https://blockstack-www.imgix.net/apps/graphitedocs-app-icon.png',
      name: 'Graphite',
      description: 'Create documents and share files',
      href: 'https://www.graphitedocs.com/',
      color: 'ink'
    },
    {
      src: 'https://blockstack-www.imgix.net/app-cards/app-card-formsid.png',
      icon: 'https://blockstack-www.imgix.net/apps/formsid-app-icon.png',
      name: 'Forms.id',
      description: 'Private alternative to Google Forms',
      href: 'https://forms.id/'
    },
    {
      src:
        'https://blockstack-www.imgix.net/app-cards/app-card-local-lightning.png',
      icon:
        'https://blockstack-www.imgix.net/apps/local-lightning-app-icon.png',
      name: 'Local Lightning',
      description: 'Buy and sell Bitcoin locally via the Lightning Network',
      href: 'https://www.locallightning.net/#/home'
    },
    {
      src: 'https://blockstack-www.imgix.net/app-cards/app-card-zinc.png',
      icon: 'https://blockstack-www.imgix.net/apps/zinc-app-icon.png',
      name: 'Zinc',
      description: 'Automated referencing software',
      href: 'https://zinc.work/'
    }
  ],
  [
    {
      src: 'https://blockstack-www.imgix.net/app-cards/app-card-noteriot.png',
      icon: 'https://blockstack-www.imgix.net/apps/noteriot-app-icon.png',
      name: 'Note Riot',
      description: 'Private and secure note keeping tool',
      href: 'https://note.riot.ai/'
    },
    {
      src: 'https://blockstack-www.imgix.net/app-cards/app-card-recall.png',
      icon: 'https://blockstack-www.imgix.net/apps/recall-app-icon.png',
      name: 'Recall',
      description: 'Open-source photo vault app',
      href: 'https://recall.photos/',
      color: 'ink'
    },
    {
      src: 'https://blockstack-www.imgix.net/app-cards/app-card-scannie.png',
      icon: 'https://blockstack-www.imgix.net/apps/scannie-app-icon.png',
      name: 'Scannie',
      description: 'Scan your documents and keep them secure forever',
      href: 'https://www.scannieapp.com/'
    },
    {
      src: 'https://blockstack-www.imgix.net/app-cards/app-card-sigle.png',
      icon: 'https://blockstack-www.imgix.net/apps/sigle-app-icon.png',
      name: 'Sigle',
      description: 'Decentralized & open source blog maker',
      href: 'https://www.sigle.io/',
      color: 'ink'
    },
    {
      src: 'https://blockstack-www.imgix.net/app-cards/app-card-xor.png',
      icon: 'https://blockstack-www.imgix.net/apps/xor-app-icon.png',
      name: 'Xor Drive',
      description: 'Encrypted, decentralized file manager',
      href: 'https://xordrive.io/'
    }
  ]
]

const AppCardItem = ({
  src,
  name,
  description,
  icon,
  color,
  href,
  ...rest
}) => {
  const [hovered, bind] = useHover()
  return (
    <Flex
      alignItems="flex-end"
      width={['360px', '360px', '570px']}
      height={[218, 218, 346, 346]}
      flexShrink={0}
      flexGrow={1}
      position="relative"
      m={4}
      borderRadius="8px"
      boxShadow={
        hovered
          ? '0px 16px 24px rgba(0, 0, 0, 0.04), 0px 1px 2px rgba(0, 0, 0, 0.08)'
          : '0px 2px 12px rgba(0, 0, 0, 0.04), 0px 1px 2px rgba(0, 0, 0, 0.08)'
      }
      cursor={hovered ? 'pointer' : 'unset'}
      transition={transition}
      transform={`translate3d(0,${hovered ? -8 : 0}px,0)`}
      willChange="transform"
      {...bind}
      {...rest}
    >
      <Box
        is="a"
        href={href}
        target="_blank"
        position="absolute"
        width={'100%'}
        height={'100%'}
        left={0}
        top={0}
        zIndex={999}
      />
      <Flex alignItems="center" p={[3, 3, 5]} position="absolute" zIndex={99}>
        <Box size={56} mr={3}>
          <Image alt={`Application Icon for ${name}`} noBlur src={icon} />
        </Box>
        <Box>
          <Box>
            <Title color={color || 'white'} is="h4" fontSize={[2, 2, 3]}>
              {name}
            </Title>
          </Box>
          <Box>
            <Text fontSize={1} color={color || 'white'}>
              {description}
            </Text>
          </Box>
        </Box>
      </Flex>
      <Image borderRadius="8px" alt={`Background for ${name}`} src={src} />
    </Flex>
  )
}

const AppCards = ({ items: rows, ...rest }) => {
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 5, tension: 350, friction: 120 }
  }))
  const trans1 = (x, y) => `translate3d(${y / -12}%,0,0)`
  const trans2 = (x, y) => `translate3d(${y / -10}%,0,0)`

  const [ref, inView, entry] = useInView({
    threshold: 0
  })

  const handleScroll = useCallback(
    (e) => {
      if (inView && typeof window !== 'undefined') {
        set({ xy: [window.scrollX, window.scrollY] })
      }
    },
    [inView]
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [inView])
  return (
    <div ref={ref}>
      <Box
        px={4}
        position="relative"
        {...useInViewAnimationStyles()}
        {...rest}
        width={1}
      >
        {rows.map((items, key) => (
          <Box
            is={a.div}
            key={key}
            style={
              key === 0
                ? {
                    transform: props.xy.interpolate(trans2)
                  }
                : {
                    transform: props.xy.interpolate(trans1)
                  }
            }
          >
            <Flex
              width={1}
              ml={
                key === 0
                  ? ['70px', '90px', '120px', '470px']
                  : ['40px', '90px', '90px', '640px']
              }
            >
              {items.map((item, appKey) => (
                <AppCardItem {...item} key={appKey} />
              ))}
            </Flex>
          </Box>
        ))}
      </Box>
    </div>
  )
}

const Hero = ({ ...rest }) => (
  <>
    <Section
      flexDirection="column"
      textAlign="center"
      minHeight={`calc(60vh - 112px)`}
      variant="white"
      width={1}
      alignItems="center"
      justifyContent="center"
    >
      <Section.Pane width={1} justifyContent="center" alignItems="center">
        <Section.Title pb={[5, 5, 5]} maxWidth={['100%', '100%', '60%']}>
          Apps that protect your digital rights
        </Section.Title>
        <Section.Text maxWidth={['100%', '100%', '50%']}>
          Blockstack ID provides user-controlled login and storage that enable
          you to take back control of your identity and data. Creating a
          Blockstack ID is easy, free, and secure.
        </Section.Text>
        <Flex
          width={1}
          justifyContent={['flex-start', 'flex-start', 'center']}
          flexDirection={['column', 'column', 'row']}
          pt={5}
        >
          <Button
            width={[1, 1, 'unset']}
            href="https://browser.blockstack.org/sign-up"
            target="_blank"
          >
            Create ID
          </Button>
        </Flex>
      </Section.Pane>
    </Section>
    <Box overflow="hidden">
      <Section noWrapper minHeight={0} py={0}>
        <AppCards items={appCards} />
      </Section>
    </Box>
  </>
)

class HomePage extends React.Component {
  static async getInitialProps(ctx) {
    return {
      meta
    }
  }
  render() {
    const sections = [
      {
        variant: 'white',
        minHeight: '400px',
        py: 8,
        panes: [
          [
            {
              title: {
                is: 'h2',
                children: 'An online identity you control'
              }
            },
            {
              title: {
                is: 'h4',
                children:
                  'With the old internet, big companies control your login. '
              }
            },
            {
              text: {
                children:
                  'With Blockstack, you own your login. Under the hood, the Stacks blockchain keeps everything secure and private. Your data is locked and encrypted and only you have the keys.'
              }
            }
          ],
          {
            type: 'graphic',
            src: 'https://blockstack-www.imgix.net/try-id-graphic.png'
          }
        ]
      },
      {
        variant: 'white',
        minHeight: '400px',
        bg: '#FDFCFF',
        py: 8,
        panes: [
          {
            type: 'video',
            src: '/static/videos/graphic-data-ownership.mp4',
            videoProps: {
              ratio: '74.5%'
            }
          },
          [
            {
              title: {
                is: 'h2',
                children: 'True data ownership'
              }
            },
            {
              title: {
                is: 'h4',
                children: 'With the old internet, big companies own your data. '
              }
            },
            {
              text: {
                children:
                  'With Blockstack, relax knowing your data is 100% your property. All your photos, messages, health records, you name it—are stored stored in a private data locker that’s encrypted by default.'
              }
            }
          ]
        ]
      },
      {
        variant: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        panes: [
          {
            pr: 0,
            width: 1,
            textAlign: 'center',
            title: {
              is: 'h2',
              mx: 'auto',
              width: ['100%', '100%', '55%'],
              children: 'Own your internet'
            },
            text: {
              mx: 'auto',
              width: ['100%', '100%', '55%'],
              children: `Take your first step into a user owned internet where you’re the one charge of your creations and connections, always.`
            },
            actions: {
              width: ['100%', '100%', 'unset'],
              pt: 5,
              mx: 'auto',
              items: [
                {
                  width: ['100%', '100%', 'unset'],
                  type: 'button',
                  label: 'Create ID',
                  href: 'https://browser.blockstack.org/sign-up'
                },
                {
                  width: ['100%', '100%', 'unset'],
                  type: 'button',
                  label: 'Sign in',
                  variant: 'secondary',
                  href: 'https://browser.blockstack.org/sign-in'
                }
              ]
            }
          }
        ]
      },
      { ...installSection }
    ]

    return (
      <>
        <Hero />
        <Sections sections={sections} />
      </>
    )
  }
}

export default HomePage
