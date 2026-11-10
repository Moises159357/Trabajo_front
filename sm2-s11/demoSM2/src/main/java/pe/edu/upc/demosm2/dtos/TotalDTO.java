package pe.edu.upc.demosm2.dtos;

public class TotalDTO {
    private String nameStreaming;
    private Long totalMovies;

    public String getNameStreaming() {
        return nameStreaming;
    }

    public void setNameStreaming(String nameStreaming) {
        this.nameStreaming = nameStreaming;
    }

    public Long getTotalMovies() {
        return totalMovies;
    }

    public void setTotalMovies(Long totalMovies) {
        this.totalMovies = totalMovies;
    }
}
