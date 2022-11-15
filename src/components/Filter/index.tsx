import React, { useState } from 'react';
import { Col, Row, Input, Typography, Radio, Select, Tag } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  priorityFilter,
  searchFilter,
  selectFilters,
  statusFilter,
} from "../../features/filters/filtersSlice";

const { Search } = Input;

export default function Filters() {
    const filters = useAppSelector(selectFilters);
    const [searchText, setSearchText] = useState(filters.search);
    const [filterByStatus, setFilterByStatus] = useState(filters.status);
    const [filterByPriority, setFilterByPriority] = useState(filters.priority);
    const dispatch = useAppDispatch();

    const handleSearchTextChange = (e: any) => {
        setSearchText(e.target.value);
        dispatch(
            searchFilter(e.target.value)
        )
    };

    const handleFilterByStatusChange = (e: any) => {
        setFilterByStatus(e.target.value);
        dispatch(
            statusFilter(e.target.value)
        )
    };

    const handleFilterByPriorityChange = (value: any) => {
        setFilterByPriority(value);
        dispatch(
            priorityFilter(value)
        )
    };

    return (
        <Row justify='center'>
            <Col span={24}>
                <Typography.Paragraph
                    style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                >
                    Search
                </Typography.Paragraph>
                <Search
                    value={searchText}
                    onChange={handleSearchTextChange}
                    placeholder='Input search text' />
            </Col>
            <Col sm={24}>
                <Typography.Paragraph
                    style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                >
                    Filter By Status
                </Typography.Paragraph>
                <Radio.Group
                    defaultValue={filterByStatus}
                    onChange={handleFilterByStatusChange}
                >
                    <Radio value='All'>All</Radio>
                    <Radio value='Completed'>Completed</Radio>
                    <Radio value='Todo'>To do</Radio>
                </Radio.Group>
            </Col>
            <Col sm={24}>
                <Typography.Paragraph
                    style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                >
                    Filter By Priority
                </Typography.Paragraph>
                <Select
                    value={filterByPriority}
                    onChange={handleFilterByPriorityChange}
                    defaultValue={filterByPriority}
                    mode='multiple'
                    allowClear
                    placeholder='Please select'
                    style={{ width: '100%' }}
                >
                    <Select.Option value='High' label='High'>
                        <Tag color='red'>High</Tag>
                    </Select.Option>
                    <Select.Option value='Medium' label='Medium'>
                        <Tag color='blue'>Medium</Tag>
                    </Select.Option>
                    <Select.Option value='Low' label='Low'>
                        <Tag color='gray'>Low</Tag>
                    </Select.Option>
                </Select>
            </Col>
        </Row>
    );
}