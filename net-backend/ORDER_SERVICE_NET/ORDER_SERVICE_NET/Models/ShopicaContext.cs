using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ORDER_SERVICE_NET.Models
{
    public partial class ShopicaContext : DbContext
    {
        public ShopicaContext()
        {
        }

        public ShopicaContext(DbContextOptions<ShopicaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<OrderDetail> OrderDetail { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.StoreId })
                    .HasName("PRIMARY");

                entity.ToTable("order");

                entity.HasIndex(e => e.PromotionId)
                    .HasName("fk_order_promotion1_idx");

                entity.HasIndex(e => e.StoreId)
                    .HasName("fk_order_store1_idx");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.StoreId)
                    .HasColumnName("store_id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnName("address")
                    .HasMaxLength(100);

                entity.Property(e => e.CreatedBy)
                    .HasColumnName("created_by")
                    .HasMaxLength(45);

                entity.Property(e => e.CustomerName)
                    .HasColumnName("customer_name")
                    .HasMaxLength(100);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(45);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasColumnName("phone")
                    .HasMaxLength(12);

                entity.Property(e => e.PromotionId)
                    .HasColumnName("promotion_id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.QrCode)
                    .HasColumnName("qr_code")
                    .HasColumnType("longtext");

                entity.Property(e => e.State)
                    .IsRequired()
                    .HasColumnName("state")
                    .HasColumnType("enum('PENDING','DELIVER','COMPLETE','CANCLE')");

                entity.Property(e => e.Total)
                    .HasColumnName("total")
                    .HasColumnType("decimal(10,0)");

                entity.Property(e => e.UpdatedBy)
                    .HasColumnName("updated_by")
                    .HasMaxLength(45);
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.OrderId, e.ProductDetailId })
                    .HasName("PRIMARY");

                entity.ToTable("order_detail");

                entity.HasIndex(e => e.OrderId)
                    .HasName("fk_order_detail_order1_idx");

                entity.HasIndex(e => e.ProductDetailId)
                    .HasName("fk_order_detail_product_detail1_idx");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.OrderId)
                    .HasColumnName("order_id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.ProductDetailId)
                    .HasColumnName("product_detail_id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.CreatedBy)
                    .HasColumnName("created_by")
                    .HasMaxLength(45);

                entity.Property(e => e.Quantity)
                    .HasColumnName("quantity")
                    .HasColumnType("int(11)");

                entity.Property(e => e.TotalPriceProduct)
                    .HasColumnName("total_price_product")
                    .HasColumnType("decimal(10,0)");

                entity.Property(e => e.UpdatedBy)
                    .HasColumnName("updated_by")
                    .HasMaxLength(45);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
