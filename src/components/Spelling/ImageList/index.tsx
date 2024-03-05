import styles from "./ImageList.module.css";

type ImageListProps = {
  data: DataProps[];
};

function ImageList({ data }: ImageListProps) {
  if (data?.length > 0) {
    return (
      <ul className={styles.list}>
        {data.map(({ id, image, alt }: DataProps) => (
          <li className={styles.listItem} key={id}>
            <img src={image} alt={alt} />
          </li>
        ))}
      </ul>
    );
  }
  return null;
}

export default ImageList;
