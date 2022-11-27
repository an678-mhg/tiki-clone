import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import Main from "../components/Home/Main";
import Sidebar from "../components/Home/Sidebar";
import HeaderOnlyLayout from "../components/Layout/HeaderOnlyLayout";
import Meta from "../components/Meta";
import { getAllBrand } from "../services/brand";
import { getAllCategory } from "../services/category";
import { getAllProduct } from "../services/product";
import { getAllSlide } from "../services/slide";
import { Brand, Category, PaginateResponse, Product, Slide } from "../types";

interface HomeProps {
  products: PaginateResponse<Product>;
  slides: Slide[];
  brands: Brand[];
  categories: Category[];
}

const Home: NextPage<HomeProps> = ({
  products,
  slides,
  categories,
  brands,
}) => {
  return (
    <HeaderOnlyLayout>
      <Meta
        title="Tiki - Mua hàng online giá tốt, hàng chuẩn, ship nhanh"
        description="Tiện lợi mua sắm hàng triệu mặt hàng, dịch vụ. Vô vàn ưu đãi freeship, mã giảm giá. Hoàn tiền 15% tối đa 600k/tháng với thẻ tín dụng TikiCARD."
        image="https://res.cloudinary.com/annnn/image/upload/v1667546413/A%CC%89nh_chu%CC%A3p_ma%CC%80n_hi%CC%80nh_2022-11-04_141847_peqmfi.png"
      />
      <div className="min-h-screen mt-5">
        <div className="flex">
          <Sidebar categories={categories} brands={brands} />
          <Main products={products} slides={slides} />
        </div>
      </div>
    </HeaderOnlyLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const sort = Number(context.query?.sort) || 1;
    const category = context.query.category as string;
    const brand = context.query.brand as string;
    const page = Number(context.query.page) || 1;
    const starts = Number(context.query.starts) || undefined;
    const lte = Number(context.query.lte) || undefined;
    const gte = Number(context.query.gte) || undefined;

    const [products, slides, brands, categories] = await Promise.all([
      getAllProduct(sort, category, brand, page, 20, starts, gte, lte),
      getAllSlide(),
      getAllBrand(),
      getAllCategory(),
    ]);

    return {
      props: {
        products,
        slides,
        brands,
        categories,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Home;
