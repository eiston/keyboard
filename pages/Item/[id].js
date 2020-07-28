/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */

export default function Item() {
  return (
    <>
    hi
    </>
  );
}
export async function getStaticPaths() {
  const paths = {
    params: {
      id: 1,
    },
  };
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({params}) {
  return {
    props: {
    },
  };
}
