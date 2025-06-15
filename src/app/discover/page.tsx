"use client";

import { useBaseUrl } from "@/hooks/useBaseUrl";
import styles from "@/styles/page/Discover.module.scss";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Typography from "@/components/Typography";
import moment from "moment";
import Button from "@/components/Button/Button";
// import { catetagories, dataHomePage } from "@/constants/home";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import { TfiReload } from "react-icons/tfi";

// Thêm "All" vào đầu catetagories nếu chưa có

export default function Discover() {
  const { baseUrl, setBaseUrl } = useBaseUrl();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type VideoItem = {
    thumbnail_url: string;
    title_translated: string;
    published_at: string;
    summary_translated: string;
    video_id: string;
    url: string;
  };

  const [data, setData] = useState<VideoItem[]>([]);

  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [totalItem, setTotalItem] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchKeyYoutube, setSearchKeyYoutube] = useState("");

  // Thêm state cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Số item mỗi trang

  const detailRef = useRef<HTMLDivElement>(null);

  const handleFetchData = async () => {
    try {
      const params = new URLSearchParams({
        keyword: searchKeyword,
        page: currentPage.toString(),
        category: selectedCategory !== "All" ? selectedCategory : "All",
      });

      const res = await axios.get(`${baseUrl}/articles?${params.toString()}`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      setData(res.data.data);
      setTotalItem(res.data.total_count);
    } catch (_error: unknown) {
      console.log(_error);
      setData([]);
    }
  };

  const handleResetData = async () => {
    try {
      const params = new URLSearchParams({
        keyword: "",
        page: currentPage.toString(),
        category: selectedCategory !== "All" ? selectedCategory : "All",
      });

      const res = await axios.get(`${baseUrl}/articles?${params.toString()}`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      setData(res.data.data);
      setTotalItem(res.data.total_count);
    } catch (_error: unknown) {
      console.log(_error);
      setData([]);
    }
  };

  const handleFetchCategories = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get_categories`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });

      setCategories(res.data.categories);
      setSelectedCategory(res.data.categories[0]);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localBaseUrl = localStorage.getItem("baseUrl");
      if (localBaseUrl) {
        setBaseUrl(localBaseUrl);
      }
    }
  }, [setBaseUrl]);

  useEffect(() => {
    handleFetchData();
  }, [currentPage, selectedCategory, baseUrl]);

  useEffect(() => {
    handleFetchCategories();
  }, [baseUrl]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    if (openIdx !== null && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [openIdx]);

  useEffect(() => {
    setOpenIdx(null); // Đóng detail khi chọn category mới
  }, [selectedCategory, currentPage]);

  const totalPages = Math.ceil(totalItem / pageSize);
  const startIdx = (currentPage - 1) * pageSize; //

  return (
    <div className={styles.container}>
      <div className={styles.listCategories}>
        {categories.map((category, idx) => (
          <Button
            key={idx}
            text={category}
            onClick={() => {
              setCurrentPage(1); // Reset về trang đầu khi chọn category mới
              setSelectedCategory(category);
            }}
            className={`${styles.categoryButton} ${
              selectedCategory === category ? styles.active : ""
            }`}
          />
        ))}
      </div>
      <div className={styles.listNews}>
        <div className={styles.inputBox}>
          <div className={styles.inputYtBox}>
            <Button
              icon={<TfiReload />}
              onClick={() => {
                setCurrentPage(1);
                setSearchKeyword("");
                handleResetData();
              }}
            />
            <Input
              placeholder="Tìm kiếm..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     setDebouncedKeyword(searchKeyword); // Gán luôn keyword để tìm kiếm ngay
              //     setCurrentPage(1); // Reset về trang đầu nếu muốn
              //   }
              // }}
            />
            <Button
              text="Tìm kiếm"
              onClick={() => {
                setCurrentPage(1);
                handleFetchData();
              }}
            />
          </div>
          <div className={styles.inputYtBox}>
            <Input
              placeholder="Nhập key youtube..."
              value={searchKeyYoutube}
              onChange={(e) => setSearchKeyYoutube(e.target.value)}
            ></Input>
            <Button
              text="Xử lý"
              onClick={() => {
                if (!searchKeyYoutube.trim()) {
                  alert("Vui lòng nhập key youtube!");
                  return;
                }
                router.push(`/youtube/${searchKeyYoutube}`);
              }}
            />
          </div>
        </div>
        {data.map((item, idx) => {
          const realIdx = startIdx + idx;
          return (
            <div key={realIdx}>
              <div
                className={styles.card}
                onClick={() => setOpenIdx(openIdx === realIdx ? null : realIdx)}
                style={{ cursor: "pointer" }}
              >
                <div className={styles.cardImage}>
                  <img src={item.thumbnail_url} alt="img" />
                </div>
                <div className={styles.cardContent}>
                  <Typography type="title-5" className={styles.cardTitle}>
                    {item.title_translated}
                  </Typography>
                  <Typography type="body-2" className={styles.cardDate}>
                    {moment(item.published_at).format("YYYY/MM/DD")}
                  </Typography>
                </div>
              </div>
              {openIdx === realIdx && (
                <div className={styles.detail} ref={detailRef}>
                  <Typography type="label-1">Nội dung:</Typography>
                  <Typography className={styles.content} type="label-4">
                    {item.summary_translated}
                  </Typography>
                  <div className={styles.buttonBox}>
                    <Button
                      text="Xem chi tiết"
                      onClick={() => router.push(`/discover/${item.video_id}`)}
                    />
                    <Button
                      text="Xem video"
                      onClick={() => window.open(item.url, "_blank")}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Phân trang */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 24,
            gap: 8,
          }}
        >
          <Button
            text="Trước"
            onClick={() => {
              setCurrentPage((p) => Math.max(1, p - 1));
            }}
            disabled={currentPage === 1}
          />
          <span
            style={{
              color: "black",
              alignSelf: "center",
              marginLeft: 8,
              marginRight: 8,
            }}
          >
            Trang: {currentPage} / {totalPages}
          </span>
          <Button
            text="Sau"
            onClick={() => {
              setCurrentPage((p) => Math.min(totalPages, p + 1));
            }}
            disabled={currentPage === totalPages}
          />
        </div>
      </div>
    </div>
  );
}
