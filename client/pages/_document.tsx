import Document, { Html, Head, Main, NextScript } from 'next/document'

function MyDocument() {
  return (
    <Html>
      <Head>
       
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument

// Path: client\pages\_app.tsx
// Compare this snippet from client\pages\dashboards.tsx:
// import AppLayout from "components/Layouts/AppLayout";
// import Head from "next/head";
// 
// const Dashboard = () => {
//   return (
//     <AppLayout
//       header={
//         <h2 className="font-semibold text-xl text-gray-800 leading-tight">
//           Dashboard
//         </h2>
//       }
//     >
//       <Head
//         title="Laravel - Dashboard"
//       />
//