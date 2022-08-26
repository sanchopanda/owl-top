import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import cn from "classnames";
import { useState, useEffect, KeyboardEvent, forwardRef, ForwardedRef } from "react";
import StarIcon from "./star.svg";
import { spawn } from "child_process";

export const Rating = forwardRef(({ isEditable = false, rating, error, setRating, className, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
        <span
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable,
          })}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => onclick(i + 1)}
        >
          <StarIcon tabIndex={isEditable ? 0 : -1} onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpace(i + 1, e)} />
        </span>
      );
    });
    setRatingArray(updatedArray);
  };

  const changeDisplay = (i: number) => {
    if (!isEditable) return;
    constructRating(i);
  };

  const onclick = (i: number) => {
    if (!isEditable || !setRating) return;
    setRating(i);
  };

  const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
    if (e.code != "Space" || !setRating) return;
    setRating(i);
  };

  return (
    <div {...props} ref={ref} className={cn(styles.ratingWrapper)}>
      {ratingArray.map((r, i) => (
        <span key={i}>{r}</span>
      ))}
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});
