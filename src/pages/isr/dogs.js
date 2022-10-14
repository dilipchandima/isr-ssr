import Link from "next/link";
import React from "react";
import styles from "../../styles/Home.module.css";

const Post = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.dogs}>
        {Object.keys(data).map((item) => (
          <div key={item} className={styles.dogGroup}>
            <Link href={`/isr/breeds/${item}`}>
              <div>{item}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(`https://dog.ceo/api/breeds/list/all`);
  const data = await res.json();

  return {
    props: { data: data.message },
    revalidate: 10,
  };
}

export default Post;
