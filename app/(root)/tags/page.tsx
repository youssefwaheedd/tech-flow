import { Filters } from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import PaginationComponent from "@/components/shared/PaginationComponent";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Badge } from "@/components/ui/badge";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.actions";
import { SearchParamsProps } from "@/types";
import Link from "next/link";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: Number(searchParams.page),
  });

  return (
    <div className="flex min-h-screen flex-col">
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tags"
          otherClasses="flex-1"
        />

        <Filters
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      {result?.tags?.length ? (
        <section className="max-xs:grid mt-12 flex w-full grid-cols-2 flex-wrap items-center justify-start gap-4">
          {result?.tags.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="shadow-light100_darknone"
            >
              <article className="background-light900_dark200 light-border flex w-full max-w-[260px] flex-col items-center justify-center rounded-2xl border p-5 sm:w-[260px] sm:justify-center">
                <Badge className="body-medium background-light800_dark400 text-light400_light500 !line-clamp-1 w-fit whitespace-nowrap rounded-md border-none px-4 py-2 text-center uppercase">
                  {tag.name}
                </Badge>

                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length}+
                  </span>{" "}
                  Questions
                </p>
              </article>
            </Link>
          ))}
        </section>
      ) : (
        <NoResult
          title="No Tags Found"
          description="It looks like there are no tags found."
          buttonHref="/ask-question"
          buttonTitle="Ask a question"
        />
      )}

      {result?.tags?.length > 20 && (
        <div className="mt-auto">
          <PaginationComponent noOfCards={result?.totalTags} pageSize={20} />
        </div>
      )}
    </div>
  );
};

export default Page;
