"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ShimmerContentBlock } from "shimmer-effects-react";
import Breadcrumb from "@/components/common/Breadcrumb";

interface item {
  id: number;
  eventName: string;
  description: string;
  details: string;
  banner: string;
  created_at: string;
  images: any;
}

const BlogDetails = () => {
  const router = useParams();
  const { id } = router;

  const [service, setService] = useState<item>(); // Single service object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [services, setServices] = useState<item[]>();

  useEffect(() => {
    const fetchService = async () => {
      if (!id) return; // Skip fetch if id is not available
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/event_list`
        );
        const filteredService = response.data.find(
          (service: item) => service.id === Number(id)
        );
        setServices(
          response.data?.filter((e: item) => e.id !== filteredService.id)
        );
        setService(filteredService);
      } catch (error) {
        setError("Error fetching service data");
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  // if (loading) {
  //   return <p>Loading...</p>; // Or a loading spinner
  // }

  // if (error) {
  //   return <p>{error}</p>; // Display error message
  // }

  // if (!service) {
  //   return <p>No events found.</p>; // Handle case where no service is found
  // }

  console.log(service?.eventName, "event name");
  return (
    <>
      <Breadcrumb title="Blog Details" sub_title={service?.eventName} />

      <div
        style={{ marginTop: "100px" }}
        className="postbox__area pt-100 pb-20"
      >
        <div className="container">
          {error && !loading && !service && <p>{error}</p>}
          {!service && !loading && <p>No news found.</p>}
          {loading ? (
            <ShimmerContentBlock
              mode="light"
              center={true}
              height={200}
              width={300}
            ></ShimmerContentBlock>
          ) : (
            service && (
              <>
                <div className="row mt-100">
                  <div className="col-xxl-8 col-xl-8 col-lg-8">
                    <div className="postbox__details-wrapper">
                      <article>
                        <div
                          className="postbox__thumb mb-20 w-img wow tpfadeUp"
                          data-wow-duration=".9s"
                          data-wow-delay=".5s"
                          style={{ position: "relative", height: "300px" }}
                        >
                          <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${service?.banner}`}
                            alt={service?.eventName || "event Image"}
                            fill
                            style={{ objectFit: "cover" }}
                            objectFit="cover" // Ensures consistent aspect ratio
                          />
                        </div>
                        <div
                          className="postbox__details-title-box pb-40 wow tpfadeUp"
                          data-wow-duration=".9s"
                          data-wow-delay=".7s"
                        >
                          <div className="post-info row mb_15 clearfix">
                            <p>
                              <Link href={`/blog/${service.id}`}>
                                Admin |{" "}
                                {new Date(service?.created_at)?.toDateString()}
                              </Link>
                            </p>
                          </div>
                          <h4 className="postbox__details-title mb-20">
                            {service?.eventName}
                          </h4>
                          <span>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: service?.description,
                              }}
                            ></p>
                          </span>
                        </div>

                        <div
                          className="postbox__content pb-20 wow tpfadeUp"
                          data-wow-duration=".9s"
                          data-wow-delay=".9s"
                        >
                          <div className="postbox__content-img mb-20 d-flex justify-content-between">
                            {JSON.parse(service?.images)?.map((e: item) => {
                              return (
                                <div className="col-lg-6 col-md-6 col-sm-12 image-column">
                                  <figure
                                    style={{
                                      position: "relative",
                                      width: "100%",
                                      height: "200px",
                                    }}
                                    className="image-box mb_30"
                                  >
                                    <img
                                      src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${e}`}
                                      alt={service.eventName || "Event Image"}
                                    />
                                  </figure>
                                </div>
                              );
                            })}
                          </div>
                          <div
                            style={{ marginTop: "20px", marginBottom: "60px" }}
                            className="text-box"
                          >
                            <p
                              dangerouslySetInnerHTML={{
                                __html: service?.details,
                              }}
                            ></p>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>

                  <div className="col-xxl-4 col-xl-4 col-lg-4">
                    <div className="sidebar__wrapper-box">
                      <div
                        className="sidebar__widget mb-40 wow tpfadeUp"
                        data-wow-duration=".9s"
                        data-wow-delay="1s"
                      >
                        <div className="sidebar__widge-title-box">
                          <h3 className="sidebar__widget-title">Recent Post</h3>
                        </div>
                        <div className="sidebar__widget-content">
                          <div className="sidebar__post">
                            {services?.map((e) => {
                              return (
                                <div className="rc__post mb-20 d-flex">
                                  <div className="rc__post-thumb mr-20">
                                    <Link href={`/blog/${e?.id}`}>
                                      <figure
                                        style={{
                                          position: "relative",
                                          width: "100px",
                                          height: "100px",
                                        }}
                                        className="image-box mb_30"
                                      >
                                        <img
                                          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${e?.banner}`}
                                          alt={e.eventName || "Event Image"}
                                        />
                                      </figure>
                                    </Link>
                                  </div>
                                  <div
                                    style={{ marginLeft: "20px" }}
                                    className="ml_10 rc__post-contentd"
                                  >
                                    <h3 className="rc__post-titled">
                                      <Link href={`/blog/${e?.id}`}>
                                        {e?.eventName}
                                      </Link>
                                    </h3>
                                    <div className="rc__meta">
                                      <span>
                                        {new Date(
                                          e?.created_at
                                        )?.toDateString()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default BlogDetails;