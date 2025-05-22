"use client";

import { useBaseUrl } from "@/hooks/useBaseUrl";
import styles from "@/styles/page/Discover.module.scss";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Typography from "@/components/Typography";
import moment from "moment";
import Button from "@/components/Button/Button";
import { catetagories, dataHomePage } from "@/constants/home";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";

// Thêm "All" vào đầu catetagories nếu chưa có

export default function Discover() {
  const { baseUrl } = useBaseUrl();
  const router = useRouter();

  const [data, setData] = useState<any[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [totalItem, setTotalItem] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchKeyYoutube, setSearchKeyYoutube] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  // Thêm state cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Số item mỗi trang

  const detailRef = useRef<HTMLDivElement>(null);

  const handleFetchData = async () => {
    try {
      const params = new URLSearchParams({
        // keyword: searchKeyword,
        page: currentPage.toString(),
        category: selectedCategory !== "All" ? selectedCategory : "All",
      });

      const res = await axios.get(`${baseUrl}/articles?${params.toString()}`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      setData(res.data.data);
      setTotalItem(res.data.total_count);
    } catch (error: unknown) {
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
    handleFetchData();
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    handleFetchCategories();
  }, []);

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

  // Debounce searchKeyword -> debouncedKeyword
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(searchKeyword);
    }, 1000); // 400ms sau khi dừng gõ mới tìm kiếm

    return () => clearTimeout(handler);
  }, [searchKeyword]);

  // Lọc data theo category nếu có chọn và theo từ khóa tìm kiếm
  const filteredData = (
    selectedCategory && selectedCategory !== "All"
      ? data.filter((item) => item.source === selectedCategory)
      : data
  ).filter(
    (item) => item.title.toLowerCase().includes(debouncedKeyword.toLowerCase())
    //  ||
    //   item.translated.toLowerCase().includes(debouncedKeyword.toLowerCase())
  );

  // Tính toán dữ liệu trang hiện tại

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
              setSelectedCategory(category);
              setCurrentPage(1); // Reset về trang đầu khi chọn category mới
            }}
            className={`${styles.categoryButton} ${
              selectedCategory === category ? styles.active : ""
            }`}
          />
        ))}
      </div>
      <div className={styles.listNews}>
        <div className={styles.inputBox}>
          <Input
            placeholder="Tìm kiếm..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
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
        {filteredData.map((item, idx) => {
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
