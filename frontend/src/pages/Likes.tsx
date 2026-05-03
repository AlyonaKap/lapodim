import { useEffect } from "react";
import { useGetUserLikes } from "@/api/queries/userLikes";
import { AnimalCard } from "@/components/ui/AnimalCard";
import Section from "@/components/ui/Section";
import { Footer } from "@/components/ui/Footer";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { Link } from "react-router-dom";

export default function Likes() {
  const { isAuthenticated, isAuthLoading, redirectToLogin } = useAuthRedirect();
  const { data: likes = [], isLoading, error } = useGetUserLikes(isAuthenticated);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      redirectToLogin("likes");
    }
  }, [isAuthenticated, isAuthLoading, redirectToLogin]);

  const isPageLoading = isAuthLoading || isLoading;

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Section className="mt-20 flex-1 rounded-[60px] lg:mt-32">
        <div className="px-4 lg:px-12">
          <h4 className="mb-3 w-fit rounded-full bg-light-blue px-4 py-1 text-xl text-light-yellow">
            Ваші вподобання
          </h4>

          {isPageLoading ? (
            <p className="py-10 text-xl text-dark-blue/70">
              Завантажуємо...
            </p>
          ) : error ? (
            <p className="py-10 text-xl text-dark-blue/70">
              Не вдалося завантажити вподобання
            </p>
          ) : likes.length === 0 ? (
            <section className="mt-9 rounded-[22px] bg-primary px-5 py-5 shadow-lg md:px-7">
            <p className="py-3 text-xl text-dark-blue">
              Поки що у вас немає обраних тваринок
            </p>
            <Link
              to="/pet-catalog/"
              className=" inline-flex w-fit rounded-full bg-foreground px-4 py-1 text-[20px] text-light-yellow transition hover:brightness-95"
            >
              Перейти до каталогу
            </Link>
            </section>
            
          ) : (
            <div className="grid grid-cols-1 gap-4 py-6 md:grid-cols-4">
              {likes.map((like) => (
                <AnimalCard
                  key={like.animal.id}
                  name={like.animal.name}
                  imageUrl={like.animal.image_url}
                  animalId={like.animal.id}
                  isNavigationEnabled={true}
                  className="w-full"
                />
              ))}
            </div>
          )}
        </div>
      </Section>

      <Footer />
    </div>
  );
}
