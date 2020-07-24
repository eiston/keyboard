/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import Layout from '../../components/layout';
import {getAllPostIds, getPostData} from '../../lib/posts';


export default function Post() {
  return <Layout></Layout>;
}
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({params}) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
