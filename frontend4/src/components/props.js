
import React from 'react'
import Banner from 'react-banner'
import 'react-banner/dist/style.css'

export default props => {
  return (
      <Banner
          logo="My Logo"
          url={ window.location.pathname }
          items={[
              { "content": "Example Link", "url": "/example" },
              { "content": "Another", "url": "/another" },
              { "content": "Link w/ Children", "url": "/children", "children": [
                  { "content": "John", "url": "/children/john" },
                  { "content": "Jill", "url": "/children/jill" },
                  { "content": "Jack", "url": "/children/jack" }
              ]}
          ]} />
  )
}