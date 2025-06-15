"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/styles/page/DetaileDiscover.module.scss";
import Typography from "@/components/Typography";
// import mockDetail from "@/constants/detailNews";
import axios from "axios";
import { useBaseUrl } from "@/hooks/useBaseUrl";

export default function DiscoverDetail() {
  const router = useRouter();
  const { slug } = useParams();

  const { baseUrl, setBaseUrl } = useBaseUrl();

  // State để lưu dữ liệu chi tiết (giả lập)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [detail, setDetail] = useState<any>(null);

  const handleFetchCategories = async () => {
    const videoId = Array.isArray(slug) ? slug[0] : slug;
    const params = new URLSearchParams({
      video_id: videoId ?? "",
    });

    try {
      const res = await axios.get(
        `${baseUrl}/view_article?${params.toString()}`,
        {
          headers: { "ngrok-skip-browser-warning": "true" },
        }
      );

      setDetail(res.data);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchCategories();
  }, [slug, baseUrl]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localBaseUrl = localStorage.getItem("baseUrl");
      if (localBaseUrl) {
        setBaseUrl(localBaseUrl);
      }
    }
  }, [setBaseUrl]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.header}>
          <button
            className={styles.backBtn}
            onClick={() => router.replace("/discover")}
          >
            &lt;
          </button>
          <Typography type="title-2" className={styles.translatedLabel}>
            {detail?.title_translated}
          </Typography>
        </div>
        <div className={styles.contentBox}>
          <div className={styles.contentTop}>
            <div className={styles.videoBox}>
              <iframe
                width="100%"
                height="100%"
                style={{ borderRadius: "20px" }}
                src={`https://www.youtube.com/embed/${detail?.video_id}`}
                title={detail?.title_translated}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className={styles.textBoxTop}>
              <Typography
                type="body-2"
                className={styles.translatedText}
                dangerouslySetInnerHTML={{
                  __html: (detail?.summary_translated || "").replace(
                    /\n/g,
                    "<br />"
                  ),
                }}
              />
            </div>
          </div>
          <div className={styles.textBoxBottom}>
            <Typography
              type="body-2"
              className={styles.translatedText}
              dangerouslySetInnerHTML={{
                __html: (detail?.scribe_translated || "").replace(
                  /\n/g,
                  "<br />"
                ),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
