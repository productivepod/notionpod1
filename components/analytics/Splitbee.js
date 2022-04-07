import Script from 'next/script'

import siteMetadata from '@/data/siteMetadata'

const SplitbeeScript = () => {
  return (
    <>
      <Script async src="https://cdn.splitbee.io/sb.js" />
    </>
  )
}

export default SplitbeeScript
