package com.jdlink.service.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Pounds;
import com.jdlink.mapper.PoundsMapper;
import com.jdlink.service.PoundsService;
import com.jdlink.util.RandomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class PoundsServiceImpl implements PoundsService {
    @Autowired
    PoundsMapper poundsMapper;

    @Override
    public int count(){ return poundsMapper.count(); }

    @Override
    public List<Pounds> listPage(Page page){ return poundsMapper.listPage(page); }

    @Override
    public Pounds getById(String id){ return poundsMapper.getById(id); }

    @Override
    public void add(Pounds pounds){ poundsMapper.add(pounds); }

    @Override
    public void update(Pounds pounds){ poundsMapper.update(pounds); }

    @Override
    public int searchCount(Pounds pounds){ return poundsMapper.searchCount(pounds); }

    @Override
    public List<Pounds> search(Pounds pounds){ return poundsMapper.search(pounds); }

    @Override
    public int countById(String id){ return poundsMapper.countById(id); }

    @Override
    public String getClientIdByName(String name){ return poundsMapper.getClientIdByName(name); }

    @Override
    public void invalid(String id){ poundsMapper.invalid(id); }

    @Override
    public String getCurrentPoundsId() {
        // 生成磅单编号
        Date date = new Date();   //获取当前时间
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        String prefix = simpleDateFormat.format(date);
        int count = countById(prefix) + 1;
        String suffix;
        if (count <= 9) suffix = "0" + count;
        else suffix = count + "";
        String id = RandomUtil.getAppointId(prefix, suffix);
        // 确保编号唯一
        while (getById(id) != null) {
            int index = Integer.parseInt(id);
            index += 1;
            id = index + "";
        }
        return id;
    }

    /**
     * 更新打印时间
     * @param id
     */
    @Override
    public void printTime(String id){
        poundsMapper.printTime(id);
    }

    /**
     * 根据转移联单Id获取对象
     * @param transferId
     * @return
     */
    @Override
    public Pounds getByTransferId(String transferId){ return poundsMapper.getByTransferId(transferId);}

    /**
     *获取全部数据
     * @return
     */
    @Override
    public List<Pounds> list(){ return poundsMapper.list(); }

}
