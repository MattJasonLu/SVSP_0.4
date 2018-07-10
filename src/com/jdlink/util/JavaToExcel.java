package com.jdlink.util;
import java.io.File;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import jxl.Sheet;
import jxl.Workbook;

import com.jdlink.util.LinkDatabase;
import com.jdlink.util.StuEntity;

public class JavaToExcel {
    /**
     * 查询t_wasteslist表中所有的数据
     * @return
     */
    public static List<StuEntity> getAllByDb(){
        List<StuEntity> list=new ArrayList<StuEntity>();
        try {
            LinkDatabase db=new LinkDatabase();
            String sql="select * from t_wasteslist";
            ResultSet rs= db.Search(sql, null);
            while (rs.next()) {
                String category=rs.getString("category");
                String industry=rs.getString("name");
                String code=rs.getString("code");
                String description=rs.getString("description");
                String wastesCharacter=rs.getString("wastesCharacter");
                //System.out.println(category+" "+industry+" "+code+ " "+description+" "+character);
                list.add(new StuEntity(category, industry, code, description, wastesCharacter));//不加id
            }

        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return list;
    }

    /**
     * 查询指定目录中电子表格中所有的数据
     * @param file 文件完整路径
     * @return
     */
    public static List<StuEntity> getAllByExcel(String file){
        List<StuEntity> list=new ArrayList<StuEntity>();
        try {
            Workbook rwb=Workbook.getWorkbook(new File(file));
            Sheet rs=rwb.getSheet(0);//或者rwb.getSheet(0)
            int clos=rs.getColumns();//得到所有的列
            int rows=rs.getRows();//得到所有的行

            System.out.println(clos+" rows:"+rows);
            for (int i = 1; i < rows; i++) {
                for (int j = 0; j < clos; j++) {
                    //第一个是列数，第二个是行数
                    String category=rs.getCell(j++, i).getContents();//默认最左边编号也算一列 所以这里得j++
                    String industry=rs.getCell(j++, i).getContents();
                    String code=rs.getCell(j++, i).getContents();
                    String description=rs.getCell(j++, i).getContents();
                    String wastesCharacter=rs.getCell(j++, i).getContents();
                        System.out.println("category:"+category+" industry:"+industry+" code:"+code+" description:"+description+" wastesCharacter:"+wastesCharacter);
                    list.add(new StuEntity(category, industry, code, description, wastesCharacter));
                }
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return list;

    }

    /**
     * 通过code判断是否存在
     * @param code
     * @return
     */
    public static boolean isExist(String code){
        try {
            LinkDatabase db=new LinkDatabase();
            ResultSet rs=db.Search("select * from t_wasteslist where code=?", new String[]{code+""});
            if (rs.next()) {
                return true;
            }
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return false;
    }

    public static void main(String[] args) {
        /*List<StuEntity> all=getAllByDb();
        for (StuEntity stuEntity : all) {
            System.out.println(stuEntity.toString());
        }*/

        System.out.println(isExist("831-001-01"));//?

    }

}
