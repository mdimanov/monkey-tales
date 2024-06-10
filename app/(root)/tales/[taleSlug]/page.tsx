import React from 'react'

const TaleDetails = ({ params }: {params: {taleSlug: string}}) => {
  return (
    <p>TaleDetails slug {params.taleSlug}</p>
  )
}

export default TaleDetails