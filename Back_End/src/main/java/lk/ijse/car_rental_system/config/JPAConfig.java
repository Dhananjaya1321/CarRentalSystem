package lk.ijse.car_rental_system.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

@Configuration
@EnableJpaRepositories(basePackages = "lk.ijse.car_rental_system.repo")
@EnableTransactionManagement
@PropertySource("classpath:properties.properties")
public class JPAConfig {

    @Autowired
    Environment environment;

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource ds, JpaVendorAdapter vad){
        LocalContainerEntityManagerFactoryBean factory= new LocalContainerEntityManagerFactoryBean();
        factory.setDataSource(ds);
        factory.setJpaVendorAdapter(vad);
        factory.setPackagesToScan(environment.getRequiredProperty("pro.entity"));
        return factory;
    }

    @Bean
    public DataSource dataSource(){
        DriverManagerDataSource dataSource= new DriverManagerDataSource();
        dataSource.setUsername(environment.getRequiredProperty("pro.username"));
        dataSource.setPassword(environment.getRequiredProperty("pro.password"));
        dataSource.setDriverClassName(environment.getRequiredProperty("pro.driver"));
        dataSource.setUrl(environment.getRequiredProperty("pro.url"));
        return dataSource;
    }

    @Bean
    public JpaVendorAdapter jpaVendorAdapter(){
        HibernateJpaVendorAdapter vendorAdapter= new HibernateJpaVendorAdapter();
        vendorAdapter.setDatabase(Database.MYSQL);
        vendorAdapter.setGenerateDdl(true);
        vendorAdapter.setDatabasePlatform(environment.getRequiredProperty("pro.dial"));
        vendorAdapter.setShowSql(true);
        return vendorAdapter;
    }


    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory factory){
        return new JpaTransactionManager(factory);
    }

}
