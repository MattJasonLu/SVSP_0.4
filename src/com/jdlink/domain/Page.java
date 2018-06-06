package com.jdlink.domain;

/**
 * Created by matt on 2018/5/24.
 * 分页类
 */
public class Page {
    /**
     * 起始位置
     */
    private int start = 0;
    /**
     * 每页的个数
     */
    private int count = 12;
    /**
     * 最后一页的位置
     */
    private int last = 0;

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public int getLast() {
        return last;
    }

    public void setLast(int last) {
        this.last = last;
    }

    /**
     * 计算最后页位置
     * @param total
     */
    public void caculateLast(int total) {
        if (0 == total % count) last = total - count;
        else last = total - total % count;
    }
}
