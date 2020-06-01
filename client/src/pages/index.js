import React from "react"

import Layout from "../components/layout"
import ConvertCurrency from "../components/convert_currency"
import History from "../components/history"
import Provider from "../providers/Provider";

const IndexPage = () => (
    <Provider>
      <Layout>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <ConvertCurrency />
          <History />
        </div>
      </Layout>
    </Provider>
)

export default IndexPage
