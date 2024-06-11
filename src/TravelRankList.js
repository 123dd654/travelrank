import React, { useState, useEffect } from 'react';

// import DatePicker from './DatePicker'; // DatePicker 컴포넌트를 불러옵니다.

const regions = {
    "Seoul": {
        "강남구": "Gangnam-gu",
        "강동구": "Gangdong-gu",
        "강북구": "Gangbuk-gu",
        "강서구": "Gangseo-gu",
        "관악구": "Gwanak-gu",
        "광진구": "Gwangjin-gu",
        "구로구": "Guro-gu",
        "금천구": "Geumcheon-gu",
        "노원구": "Nowon-gu",
        "도봉구": "Dobong-gu",
        "동대문구": "Dongdaemun-gu",
        "동작구": "Dongjak-gu",
        "마포구": "Mapo-gu",
        "서대문구": "Seodaemun-gu",
        "서초구": "Seocho-gu",
        "성동구": "Seongdong-gu",
        "성북구": "Seongbuk-gu",
        "송파구": "Songpa-gu",
        "양천구": "Yangcheon-gu",
        "영등포구": "Yeongdeungpo-gu",
        "용산구": "Yongsan-gu",
        "은평구": "Eunpyeong-gu",
        "종로구": "Jongno-gu",
        "중구": "Jung-gu",
        "중랑구": "Jungnang-gu"
    },
    "Busan": {
        "기장군": "Gijang-gun",
        // "강서구": "Gangseo-gu",
        "금정구": "Geumjeong-gu",
        "남구": "Nam-gu",
        "동구": "Dong-gu",
        "동래구": "Dongnae-gu",
        "부산진구": "Busanjin-gu",
        "북구": "Buk-gu",
        "사상구": "Sasang-gu",
        "사하구": "Saha-gu",
        "서구": "Seo-gu",
        "수영구": "Suyeong-gu",
        "연제구": "Yeonje-gu",
        "영도구": "Yeongdo-gu",
        // "중구": "Jung-gu",
        "해운대구": "Haeundae-gu"
    },
    "Daegu": {
        "달성군": " Dalseong-gun",
        "남구": " Nam-gu",
        "달서구": " Dalseo-gu",
        "동구": " Dong-gu",
        "북구": " Buk-gu",
        "서구": " Seo-gu",
        "수성구": " Suseong-gu",
        "중구": " Jung-gu"
    },
    "Incheon": {
        "강화군": "Ganghwa-gun",
        "옹진군": "Ongjin-gun",
        "계양구": "Gyeyang-gu",
        "남구": "Nam-gu",
        "남동구": "Namdong-gu",
        "동구": "Dong-gu",
        "부평구": "Bupyeong-gu",
        "서구": "Seo-gu",
        "연수구": "Yeonsu-gu",
        "중구": "Jung-gu"
    },
    "Gwangju": {
        "광산구": "Gwangsan-gu",
        "남구": "Nam-gu",
        "동구": "Dong-gu",
        "북구": "Buk-gu",
        "서구": "Seo-gu"
    },
    "Daejeon": {
        "대덕구": "Daedeok-gu",
        "동구": "Dong-gu",
        "서구": "Seo-gu",
        "유성구": "Yuseong-gu",
        "중구": "Jung-gu"
    },
    "Ulsan": {
        "울주군": "Ulju-gun",
        "남구": "Nam-gu",
        "동구": "Dong-gu",
        "북구": "Buk-gu",
        "중구": "Jung-gu"
    },
    "Sejong": {
        "세종시": "Sejong"
    },
    "Gyeonggi": {
        "고양시": "Goyang-si",
        "과천시": "Gwacheon-si",
        "광명시": "Gwangmyeong-si",
        "광주시": "Gwangju-si",
        "구리시": "Guri-si",
        "군포시": "Gunpo-si",
        "김포시": "Gimpo-si",
        "남양주시": "Namyangju-si",
        "동두천시": "Dongducheon-si",
        "부천시": "Bucheon-si",
        "성남시": "Seongnam-si",
        "수원시": "Suwon-si",
        "시흥시": "Siheung-si",
        "안산시": "Ansan-si",
        "안성시": "Anseong-si",
        "안양시": "Anyang-si",
        "양주시": "Yangju-si",
        "여주시": "Yeoju-si",
        "오산시": "Osan-si",
        "용인시": "Yongin-si",
        "의왕시": "Uiwang-si",
        "의정부시": "Uijeongbu-si",
        "이천시": "Icheon-si",
        "파주시": "Paju-si",
        "평택시": "Pyeongtaek-si",
        "포천시": "Pocheon-si",
        "하남시": "Hanam-si",
        "화성시": "Hwaseong-si",
        "가평군": "Gapyeong-gun",
        "양평군": "Yangpyeong-gun",
        "연천군": "Yeoncheon-gun"
    },
    "Gangwon": {
        "강릉시": "Gangneung-si",
        "동해시": "Donghae-si",
        "삼척시": "Samcheok-si",
        "속초시": "Sokcho-si",
        "원주시": "Wonju-si",
        "춘천시": "Chuncheon-si",
        "태백시": "Taebaek-si",
        "고성군": "Goseong-gun",
        "양구군": "Yanggu-gun",
        "양양군": "Yangyang-gun",
        "영월군": "Yeongwol-gun",
        "인제군": "Inje-gun",
        "정선군": "Jeongseon-gun",
        "철원군": "Cheorwon-gun",
        "평창군": "Pyeongchang-gun",
        "홍천군": "Hongcheon-gun",
        "화천군": "Hwacheon-gun",
        "횡성군": "Hoengseong-gun"
    },
    "Chungcheongbuk": {
        "제천시": "Jecheon-si",
        "청주시": "Cheongju-si",
        "충주시": "Chungju-si",
        "괴산군": "Goesan-gun",
        "단양군": "Danyang-gun",
        "보은군": "Boeun-gun",
        "영동군": "Yeongdong-gun",
        "옥천군": "Okcheon-gun",
        "음성군": "Eumseong-gun",
        "증평군": "Jeungpyeong-gun",
        "진천군": "Jincheon-gun"
    },
    "Chungcheongnam": {
        "계룡시": "Gyeryong-si",
        "공주시": "Gongju-si",
        "논산시": "Nonsan-si",
        "당진시": "Dangjin-si",
        "보령시": "Boryeong-si",
        "서산시": "Seosan-si",
        "아산시": "Asan-si",
        "천안시": "Cheonan-si",
        "금산군": "Geumsan-gun",
        "부여군": "Buyeo-gun",
        "서천군": "Seocheon-gun",
        "예산군": "Yesan-gun",
        "청양군": "Cheongyang-gun",
        "태안군": "Taean-gun",
        "홍성군": "Hongseong-gun"
    },
    "Jeollabuk": {
        "군산시": "Gunsan-si",
        "김제시": "Gimje-si",
        "남원시": "Namwon-si",
        "익산시": "Iksan-si",
        "전주시": "Jeonju-si",
        "정읍시": "Jeongeup-si",
        "고창군": "Gochang-gun",
        "무주군": "Muju-gun",
        "부안군": "Buan-gun",
        "순창군": "Sunchang-gun",
        "완주군": "Wanju-gun",
        "임실군": "Imsil-gun",
        "장수군": "Jangsu-gun",
        "진안군": "Jinan-gun"
    },
    "Jeollanam": {
        "광양시": "Gwangyang-si",
        "나주시": "Naju-si",
        "목포시": "Mokpo-si",
        "순천시": "Suncheon-si",
        "여수시": "Yeosu-si",
        "강진군": "Gangjin-gun",
        "고흥군": "Goheung-gun",
        "곡성군": "Gokseong-gun",
        "구례군": "Gurye-gun",
        "담양군": "Damyang-gun",
        "무안군": "Muan-gun",
        "보성군": "Boseong-gun",
        "신안군": "Sinan-gun",
        "영광군": "Yeonggwang-gun",
        "영암군": "Yeongam-gun",
        "완도군": "Wando-gun",
        "장성군": "Jangseong-gun",
        "장흥군": "Jangheung-gun",
        "진도군": "Jindo-gun",
        "함평군": "Hampyeong-gun",
        "해남군": "Haenam-gun",
        "화순군": "Hwasun-gun"
    },
    "Gyeongsangbuk": {
        "경산시": "Gyeongsan-si",
        "경주시": "Gyeongju-si",
        "구미시": "Gumi-si",
        "김천시": "Gimcheon-si",
        "문경시": "Mungyeong-si",
        "상주시": "Sangju-si",
        "안동시": "Andong-si",
        "영주시": "Yeongju-si",
        "영천시": "Yeongcheon-si",
        "포항시": "Pohang-si",
        "고령군": "Goryeong-gun",
        "군위군": "Gunwi-gun",
        "봉화군": "Bonghwa-gun",
        "성주군": "Seongju-gun",
        "영덕군": "Yeongdeok-gun",
        "영양군": "Yeongyang-gun",
        "예천군": "Yecheon-gun",
        "울릉군": "Ulleung-gun",
        "울진군": "Uljin-gun",
        "의성군": "Uiseong-gun",
        "청도군": "Cheongdo-gun",
        "청송군": "Cheongsong-gun",
        "칠곡군": "Chilgok-gun"
    },
    "Gyeongsangnam": {
        "거제시": "Geoje-si",
        "김해시": "Gimhae-si",
        "밀양시": "Miryang-si",
        "사천시": "Sacheon-si",
        "양산시": "Yangsan-si",
        "진주시": "Jinju-si",
        "창원시": "Changwon-si",
        "통영시": "Tongyeong-si",
        "거창군": "Geochang-gun",
        "고성군": "Goseong-gun",
        "남해군": "Namhae-gun",
        "산청군": "Sancheong-gun",
        "의령군": "Uiryeong-gun",
        "창녕군": "Changnyeong-gun",
        "하동군": "Hadong-gun",
        "함안군": "Haman-gun",
        "함양군": "Hamyang-gun",
        "합천군": "Hapcheon-gun"
    },
    "제주": {
        "제주도제주시": "Jeju-si"
    }
};

const TravelRankList = () => {
    const [data, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    useEffect(() => {
        if (!selectedDate || !selectedRegion || !selectedDistrict) return;

        const fetchData = async () => {
            const response = await fetch(`https://raw.githubusercontent.com/KIMJW04/travel-list-chart/main/travelrank_list/${selectedDate}/${selectedRegion}/chart_travel_${selectedDistrict}-${selectedDate}.json`);
            if (response.ok) {
                const result = await response.json();
                setData(result);
            } else {
                console.error('Error fetching data');
            }
        };

        fetchData();
    }, [selectedDate, selectedRegion, selectedDistrict]);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setSelectedRegion('');
        setSelectedDistrict('');
        setData([]);
    };

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
        setSelectedDistrict('');
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
    };

    return (
        <div>
            <h1>Travel Rank List</h1>
            <div>
                <label htmlFor="date-picker">날짜 선택: </label>
                <input
                    id="date-picker"
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </div>
            {selectedDate && (
                <div>
                    <select value={selectedRegion} onChange={handleRegionChange}>
                        <option value="">지역 선택</option>
                        {Object.keys(regions).map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                </div>
            )}

            {selectedRegion && (
                <div>
                    <select value={selectedDistrict} onChange={handleDistrictChange}>
                        <option value="">구/군 선택</option>
                        {Object.keys(regions[selectedRegion]).map(district => (
                            <option key={district} value={regions[selectedRegion][district]}>
                                {district}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {data.length === 0 ? (
                selectedDate && selectedRegion && selectedDistrict ? (
                    <div>Loading...</div>
                ) : (
                    <div>날짜와 지역을 선택하세요</div>
                )
            ) : (
                <div className='list__info'>
                    <div className='list__grid'>
                        {data.map((item, index) => (
                            <section key={index} onClick={() => window.open(item.link, '_blank')}>
                                <h2>{item.title}</h2>
                                <img src={item.image_url} alt={item.title} />
                                <p>{item.ranking}</p>
                            </section>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TravelRankList;