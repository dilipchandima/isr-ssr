import { useRouter } from "next/router";
import React from "react";
import styles from "../../../styles/Home.module.css";

const BreedDetails = ({ data }) => {
  const router = useRouter();
  const { breed } = router.query;

  return (
    <div className={styles.container}>
      {breed}
      <div>
        {data.map((item, index) => (
          <img src={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps({ params: { breed } }) {
  if (!breed) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
  const data = await res.json();

  if (data.code === 404) {
    return { notFound: true };
  }

  return { props: { data: data.message } };
}

export async function getStaticPaths() {
  const res = await fetch(`https://dog.ceo/api/breeds/list/all`);
  const data = await res.json();

  const paths = Object.keys(data.message).map((post) => ({
    params: { breed: post },
  }));

  return { paths, fallback: "blocking" };
}

export default BreedDetails;
