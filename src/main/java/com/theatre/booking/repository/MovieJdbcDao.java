package com.theatre.booking.repository;

import com.theatre.booking.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Custom DAO to demonstrate explicit JDBC and J2EE concepts using Spring's JdbcTemplate.
 */
@Repository
public class MovieJdbcDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Movie> findAllMoviesExplicitly() {
        String sql = "SELECT id, title, description, image_url, language FROM movies";
        
        return jdbcTemplate.query(sql, new RowMapper<Movie>() {
            @Override
            public Movie mapRow(ResultSet rs, int rowNum) throws SQLException {
                Movie movie = new Movie();
                movie.setId(rs.getLong("id"));
                movie.setTitle(rs.getString("title"));
                movie.setDescription(rs.getString("description"));
                movie.setImageUrl(rs.getString("image_url"));
                movie.setLanguage(rs.getString("language"));
                return movie;
            }
        });
    }
}
