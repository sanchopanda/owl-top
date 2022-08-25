import { ProductProps } from "./Product.props";
import styles from "./Product.module.css";
import cn from "classnames";
import { Button, Card, Divider, Rating, Review, ReviewForm, Tag } from "../index";
import { devclOfNum, priceRu } from "../../helpers/helpers";
import Image from "next/image";
import { useState } from "react";

export const Product = ({ product, className, ...props }: ProductProps): JSX.Element => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

  return (
    <>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <Image src={process.env.NEXT_PUBLIC_DOMAIN + product.image} width={70} height={70} alt={product.title} />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          {priceRu(product.price)}
          {product.oldPrice && (
            <Tag className={styles.oldPrice} color="green">
              {product.price - product.oldPrice}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>
          {priceRu(product.credit)}/<span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating}>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>
          {product.categories.map((c) => (
            <Tag key={c} className={styles.category} color="ghost">
              {c}
            </Tag>
          ))}
        </div>
        <div className={styles.priceTitle}>цена</div>
        <div className={styles.creditTitle}>кредит</div>
        <div className={styles.rateTitle}>
          {product.reviewCount} {devclOfNum(product.reviewCount, ["отзыв", "отзыва", "отзывов"])}
        </div>
        <div className={styles.hr}>
          <Divider className={styles.hr} />
        </div>
        <div className={styles.description}>{product.description}</div>
        <div className={styles.feature}>
          {product.characteristics.map((c) => (
            <div className={styles.characteristics}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages && (
            <div className={styles.advantages}>
              <div className={styles.advTitle}>Преимущества</div>
              {product.advantages}
            </div>
          )}
          {product.disadvantages && (
            <div className={styles.disadvantages}>
              <div className={styles.advTitle}> Недостатки</div>
              {product.disadvantages}
            </div>
          )}
        </div>
        <div className={cn(styles.hr, styles.hr2)}>
          <Divider className={cn(styles.hr)} />
        </div>
        <div className={styles.actions}>
          <Button appearence="primary">Узнать подробнее</Button>
          {product.reviews.length > 0 && (
            <Button
              appearence="ghost"
              arrow={isReviewOpened ? "down" : "right"}
              className={styles.reviewButton}
              onClick={() => setIsReviewOpened(!isReviewOpened)}
            >
              Читать отзывы
            </Button>
          )}
        </div>
      </Card>
      {product.reviews.length > 0 && (
        <Card
          color="blue"
          className={cn(styles.reviews, {
            [styles.opened]: isReviewOpened,
            [styles.closed]: !isReviewOpened,
          })}
        >
          {product.reviews.map((r) => (
            <> 
              <Review key={r._id} review={r} />
              <Divider />
            </>
          ))}
          <ReviewForm productId={product._id}/>
        </Card>
      )}
    </>
  );
};
