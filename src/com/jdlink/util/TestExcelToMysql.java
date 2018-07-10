package com.jdlink.util;
import java.util.List;

import com.jdlink.util.LinkDatabase;
import com.jdlink.util.StuEntity;
import com.jdlink.util.JavaToExcel;

public class TestExcelToMysql {
    public static void main(String[] args) {
        //得到表格中所有的数据
        List<StuEntity> listExcel=JavaToExcel.getAllByExcel("d://wastesList2017.xls");
        /*//得到数据库表中所有的数据
        List<StuEntity> listDb=StuService.getAllByDb();*/

        LinkDatabase db=new LinkDatabase();

        for (StuEntity stuEntity : listExcel) {
            String code=stuEntity.getCode();
            if (!JavaToExcel.isExist(code)) {
                //不存在就添加
                String sql="insert into t_wastesList (category,industry,code,description,wastesCharacter) values(?,?,?,?,?);";
                String[] str=new String[]{stuEntity.getCategory(),stuEntity.getIndustry(),stuEntity.getCode(),stuEntity.getDescription(),stuEntity.getWastesCharacter()};
                db.AddU(sql, str);
            }else {
                //存在就更新
                String sql="update t_wastesList set category=?,industry=?,description=?,wastesCharacter=? where code=?;";
                String[] str=new String[]{stuEntity.getCategory(),stuEntity.getIndustry(),stuEntity.getDescription(),stuEntity.getWastesCharacter(),code};
                db.AddU(sql, str);
            }
        }
    }
}
