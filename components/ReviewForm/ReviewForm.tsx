import styles from "./ReviewForm.module.css";
import cn from "classnames";
import { ReviewFormProps } from "./ReviewForm.props";
import { Button, Input, Rating, Textarea } from "../index";
import CloseIcon from "./close.svg";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import { useForm, Controller } from "react-hook-form";
import axios from "../../node_modules/axios/index";
import { API } from "../../helpers/api";
import { useState } from "react";

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IReviewForm>();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId });
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError("Что-то пошло не так");
        setIsSuccess(false);
      }
    } catch (e) {
      setError(e.message);
      setIsSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input {...register("name", { required: { value: true, message: "Заполните имя" } })} placeholder="Имя" error={errors.name} />
        <Input
          {...register("title", { required: { value: true, message: "Заполните имя" } })}
          placeholder="Заголовок отзыва"
          className={styles.title}
          error={errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            rules={{ required: { value: true, message: "Укажите рейтинг" } }}
            name="rating"
            render={({ field }) => <Rating isEditable rating={field.value} ref={field.ref} setRating={field.onChange} error={errors.rating} />}
          />
        </div>
        <Textarea
          {...register("description", { required: { value: true, message: "Заполните описание" } })}
          placeholder="Текст отзыва"
          className={styles.description}
          error={errors.description}
        />
        <div className={styles.submit}>
          <Button appearence="primary">Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && (
        <div className={styles.success}>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки</div>
          <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)}/>
        </div>
      )}
       {error && (
        <div className={styles.error}>
          Что-то пошло не так, попробуйте обновить страницу.
          <CloseIcon className={styles.close} onClick={() => setError()}/>
        </div>
      )}
    </form>
  );
};
