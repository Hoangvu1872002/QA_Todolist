"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useBaseUrl } from "@/hooks/useBaseUrl";

export default function YoutubeDetailPage() {
  const { slug } = useParams();
  const { baseUrl, setBaseUrl } = useBaseUrl();
  const router = useRouter();
  type DetailItem = {
    transcribe_text: string;
    transcribe_translated: string;
    summary_text: string;
    summary_translated: string;
    title: string;
    title_translated: string;
  };
  const [detail, setDetail] = useState<DetailItem | null>(null);
  const [loading, setLoading] = useState(true);

  const handleFetchCategories = async () => {
    setLoading(true);
    const videoId = Array.isArray(slug) ? slug[0] : slug;
    try {
      const res = await axios.post(
        `${baseUrl}/transcribe_video`,
        { message: videoId },
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
    if (detail) {
      setLoading(false);
    }
  }, [detail]);

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
    <div
      style={{
        maxWidth: 1200,
        minHeight: "75vh",
        margin: "100px auto",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {!loading && (
        <button
          onClick={() => router.replace("/discover")}
          style={{
            alignSelf: "flex-start",
            marginBottom: 24,
            padding: "8px 20px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Quay lại
        </button>
      )}
      {loading ? (
        <div style={{ textAlign: "center", width: "100%" }}>
          <span style={{ fontSize: 28 }}>⏳</span>
          <div style={{ marginTop: 16, fontSize: 18, color: "#888" }}>
            Đang tải dữ liệu...
          </div>
        </div>
      ) : detail ? (
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px #eee",
            padding: 24,
            width: "100%",
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <div
              style={{ color: "#1976d2", fontWeight: "bold", marginBottom: 4 }}
            >
              Transcribe Text
            </div>
            <div
              style={{
                color: "#333",
                whiteSpace: "pre-line",
                background: "#f0f7fa",
                borderRadius: 4,
                padding: 12,
              }}
            >
              {detail.transcribe_text}
            </div>
          </div>
          <hr />
          <div style={{ marginBottom: 24, marginTop: 24 }}>
            <div
              style={{ color: "#388e3c", fontWeight: "bold", marginBottom: 4 }}
            >
              Transcribe Translated
            </div>
            <div
              style={{
                color: "#333",
                whiteSpace: "pre-line",
                background: "#e8f5e9",
                borderRadius: 4,
                padding: 12,
              }}
            >
              {detail.transcribe_translated}
            </div>
          </div>
          <hr />
          <div style={{ marginBottom: 24, marginTop: 24 }}>
            <div
              style={{ color: "#f57c00", fontWeight: "bold", marginBottom: 4 }}
            >
              Summary Text
            </div>
            <div
              style={{
                color: "#333",
                whiteSpace: "pre-line",
                background: "#fff3e0",
                borderRadius: 4,
                padding: 12,
              }}
            >
              {detail.summary_text}
            </div>
          </div>
          <hr />
          <div style={{ marginBottom: 24, marginTop: 24 }}>
            <div
              style={{ color: "#7b1fa2", fontWeight: "bold", marginBottom: 4 }}
            >
              Summary Translated
            </div>
            <div
              style={{
                color: "#333",
                whiteSpace: "pre-line",
                background: "#f3e5f5",
                borderRadius: 4,
                padding: 12,
              }}
            >
              {detail.summary_translated}
            </div>
          </div>
          <hr />
          <div style={{ marginBottom: 24, marginTop: 24 }}>
            <div
              style={{ color: "#0288d1", fontWeight: "bold", marginBottom: 4 }}
            >
              Title
            </div>
            <div
              style={{
                color: "#333",
                whiteSpace: "pre-line",
                background: "#e1f5fe",
                borderRadius: 4,
                padding: 12,
              }}
            >
              {detail.title}
            </div>
          </div>
          <hr />
          <div style={{ marginBottom: 0, marginTop: 24 }}>
            <div
              style={{ color: "#c62828", fontWeight: "bold", marginBottom: 4 }}
            >
              Title Translated
            </div>
            <div
              style={{
                color: "#333",
                whiteSpace: "pre-line",
                background: "#ffebee",
                borderRadius: 4,
                padding: 12,
              }}
            >
              {detail.title_translated}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
