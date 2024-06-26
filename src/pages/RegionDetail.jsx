import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import regionList from "../assets/json/RegionList.json";
import Loading from "../components/Loading";

import RegionDetail_icon01 from '../assets/img/icon/RegionDetail_icon01.png';
import RegionDetail_icon02 from '../assets/img/icon/RegionDetail_icon02.png';
import map_icon from '../assets/img/icon/map.svg';
import blog_icon from '../assets/img/icon/blog.svg';
import visitor_icon from '../assets/img/icon/Visitor.svg';

const RegionDetail = () => {
    const { regionId } = useParams();
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedSubRegion, setSelectedSubRegion] = useState("");
    const [date, setDate] = useState(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().split("T")[0];
    });
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const getMinDate = () => {
        return "2024-06-13";
    };

    const getMaxDate = () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().split("T")[0];
    };

    useEffect(() => {
        if (regionId) {
            const [regionKorean, subRegionKorean] = regionId.split("-");
            if (regionList[regionKorean]) {
                setSelectedRegion(regionKorean);
                if (regionList[regionKorean].subRegions[subRegionKorean]) {
                    setSelectedSubRegion(subRegionKorean);
                } else {
                    setSelectedSubRegion(Object.keys(regionList[regionKorean].subRegions)[0]);
                }
            }
        }
    }, [regionId]);

    useEffect(() => {
        if (selectedRegion && selectedSubRegion) {
            const regionEnglish = regionList[selectedRegion]?.region;
            const subRegionEnglish = regionList[selectedRegion]?.subRegions[selectedSubRegion];
            if (regionEnglish && subRegionEnglish) {
                fetchData(regionEnglish, subRegionEnglish, date);
            }
        }
    }, [selectedRegion, selectedSubRegion, date]);

    const fetchData = async (region, subRegion, date) => {
        setIsLoading(true);
        const url = `https://raw.githubusercontent.com/KIMJW04/travel-list-chart/main/travelrank_list/${date}/${region}/chart_travel_${subRegion}-${date}.json`;

        try {
            const response = await axios.get(url);
            setData(response.data);
            setError("");
        } catch (err) {
            setError("Failed to fetch data");
        } finally {
            setTimeout(() => setIsLoading(false), 1000);
        }
    };

    const handleRegionChange = (e) => {
        const newRegion = e.target.value;
        setSelectedRegion(newRegion);
        if (regionList[newRegion]?.subRegions) {
            const firstSubRegion = Object.keys(regionList[newRegion].subRegions)[0];
            setSelectedSubRegion(firstSubRegion);
        } else {
            setSelectedSubRegion("");
        }
    };

    const handleSubRegionChange = (e) => {
        setSelectedSubRegion(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }, [currentIndex]);

    const handleNext = useCallback(() => {
        if (currentIndex < data.length - 5) {
            setCurrentIndex(currentIndex + 1);
        }
    }, [currentIndex, data.length]);

    const handleWheel = useCallback((event) => {
        if (event.deltaY < 0) {
            handlePrev();
        } else {
            handleNext();
        }
    }, [handlePrev, handleNext]);

    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            slider.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (slider) {
                slider.removeEventListener('wheel', handleWheel);
            }
        };
    }, [handleWheel]);

    return (
        <div className="region-detail">
            <Link to="/section01" className="back-link">◀︎ 이전으로</Link>
            <div className="RegionDetail_header">
                <img src={RegionDetail_icon01} alt="icon1" />
                <img src={RegionDetail_icon02} alt="icon2" />
                <h1>something enjoyably to play</h1>
            </div>
            <div className="controls">
                <select value={selectedRegion} onChange={handleRegionChange}>
                    <option value="" disabled>
                        Select a region
                    </option>
                    {Object.keys(regionList).map((regionKey) => (
                        <option key={regionKey} value={regionKey}>
                            {regionKey}
                        </option>
                    ))}
                </select>
                <select value={selectedSubRegion} onChange={handleSubRegionChange} disabled={!selectedRegion}>
                    <option value="" disabled>
                        Select a sub-region
                    </option>
                    {selectedRegion &&
                        Object.keys(regionList[selectedRegion].subRegions).map((subRegionKey) => (
                            <option key={subRegionKey} value={subRegionKey}>
                                {subRegionKey}
                            </option>
                        ))}
                </select>
                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    min={getMinDate()}
                    max={getMaxDate()}
                />
            </div>
            {isLoading && (
                <div className="loading__wrap">
                    <Loading />
                </div>
            )}
            {!isLoading && error && <p className="error">{error}</p>}
            {!isLoading && data.length > 0 && (
                <div className="slider-container">
                    <div className="slider" ref={sliderRef}>
                    {data.slice(currentIndex, currentIndex + 5).map((item, index) => {
                        const rank = index + 1 + currentIndex;
                        let rankClass = "";

                        if (rank === 1) {
                            rankClass = "gold";
                        } else if (rank === 2) {
                            rankClass = "silver";
                        } else if (rank === 3) {
                            rankClass = "bronze";
                        }

                        return (
                            <div key={index} className="card">
                                <div className={`rank-box ${rankClass}`}>{rank}</div>
                                <img src={item.image_url} alt={item.title} />
                                <h2>{item.title}</h2>
                                <h3>{item.title_cate}</h3>
                                <p>
                                    <img src={map_icon} alt="이미지1" />{item.addresses}
                                </p>
                                <p>
                                    <img src={blog_icon} alt="이미지2" /> 볼로그 리뷰 {item.blog_review}
                                </p>
                                {item.human_review && (
                                    <p>
                                        <img src={visitor_icon} alt="이미지3" /> 방문자 리뷰 {item.human_review}
                                    </p>
                                )}
                                <Link to={`/detail?x=${item.x}&y=${item.y}&link=${item.link}`} className="detail_button">상세보기</Link>
                            </div>
                        );
                    })}


                    </div>
                    {currentIndex > 0 && (
                        <button className="prev-button" onClick={handlePrev}>
                            <TiChevronLeftOutline />
                        </button>
                    )}
                    {currentIndex < data.length - 5 && (
                        <button className="next-button" onClick={handleNext}>
                            <TiChevronRightOutline />
                        </button>
                    )}
                </div>
            )}
            {!isLoading && data.length === 0 && <p>Select a region and sub-region to load data</p>}
        </div>
    );
};

export default RegionDetail;
