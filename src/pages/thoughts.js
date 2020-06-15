import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default function Thoughts({ data }) {
  const thoughtList = data.allMediumJson.edges
  return (
    <Layout>
      <div>
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Thoughts
        </h1>

        { renderThoughts(thoughtList) }

      </div>
    </Layout>
  )
}

function renderThoughts(thoughtList) {
  return thoughtList.map(({ node }) => (
    <div key={node.id}>
      <Link
        to={node.fields.slug}
        css={css`
                  text-decoration: none;
                  color: inherit;
                `}
      >
        <h3
          css={css`
                  margin-bottom: ${rhythm(1 / 4)};
                `}
        >
          {node.title}{" "}
          <span
            css={css`
                    color: #bbb;
                  `}
          >
            — {new Date(node.pubDate).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </h3>
      </Link>
    </div>
  ))
}

export const query = graphql`
  query {

    allMediumJson {
      edges {
        node {
          title
          pubDate
          fields {
            slug
          }
        }
      }
    }
  }
`