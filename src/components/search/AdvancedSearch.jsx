import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import styles from './CardWithSearch.module.css';
import Config from "../../config/config";

const AdvancedSearch = ({ onSearch }) => {
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [marketOptions] = useState([
        { value: 'None', label: 'همه' },
        { value: '2', label: 'خریداران' },
        { value: '1', label: 'فروشندگان' },
    ]);
    const [priceOptions] = useState([
        { value: 'None', label: 'همه' },
        { value: 'top', label: 'بیشترین' },
        { value: 'low', label: 'کمترین' },
    ]);

    const [selectedMarketOption, setSelectedMarketOption] = useState({ value: 'None', label: 'همه' });
    const [selectedCategoryOption, setSelectedCategoryOption] = useState({ value: 'None', label: 'همه' });
    const [selectedPriceOption, setSelectedPriceOption] = useState({ value: 'None', label: 'همه' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${Config.baseUrl}/catalogue/all_types`);
                const data = await response.json();

                const formattedOptions = [
                    { value: 'None', label: 'همه' },
                    ...data.map(item => ({
                        value: item.id,
                        label: item.title
                    }))
                ];
                
                setCategoryOptions(formattedOptions);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleMarketChange = (selectedOption) => {
        setSelectedMarketOption(selectedOption);
    };

    const handleCategoryChange = (selectedOption) => {
        setSelectedCategoryOption(selectedOption);
    };

    const handlePriceChange = (selectedOption) => {
        setSelectedPriceOption(selectedOption);
    };

    const handleSearch = () => {
        onSearch({
            bazar: selectedMarketOption.value,
            type: selectedCategoryOption.value,
            price: selectedPriceOption.value
        });
    };

    return (
        <div className={styles.advancedSearchContainer}>
            <Select
                options={marketOptions}
                onChange={handleMarketChange}
                value={selectedMarketOption}
                className={`${styles.selectItem} ${styles.selectControl}`}
                classNamePrefix="select"
                isClearable
                placeholder="انتخاب کنید"
            />
            <Select
                options={categoryOptions}
                onChange={handleCategoryChange}
                value={selectedCategoryOption}
                className={`${styles.categorySelectItem} ${styles.selectControl}`}
                classNamePrefix="select"
                isClearable
                placeholder="انتخاب کنید"
            />
            <Select
                options={priceOptions}
                onChange={handlePriceChange}
                value={selectedPriceOption}
                className={`${styles.selectItem} ${styles.selectControl}`}
                classNamePrefix="select"
                isClearable
                placeholder="انتخاب کنید"
            />
            <button className={styles.searchButton} type="button" onClick={handleSearch}>جستجو</button>
        </div>
    );
};

export default AdvancedSearch;
