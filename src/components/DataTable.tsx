import { motion } from "framer-motion";
import { BusinessData } from "@/types/business";
import { ExternalLink, Mail, Phone, Star, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

interface DataTableProps {
  data: BusinessData[];
}

export const DataTable = ({ data }: DataTableProps) => {
  if (data.length === 0) {
    return null;
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook className="h-4 w-4" />;
      case "instagram":
        return <Instagram className="h-4 w-4" />;
      case "twitter":
        return <Twitter className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="industrial-panel rounded-xl overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-iron/50 border-b border-border">
              <th className="px-4 py-4 text-left font-display text-xs uppercase tracking-wider text-muted-foreground">
                Business
              </th>
              <th className="px-4 py-4 text-left font-display text-xs uppercase tracking-wider text-muted-foreground">
                Contact
              </th>
              <th className="px-4 py-4 text-left font-display text-xs uppercase tracking-wider text-muted-foreground hidden md:table-cell">
                Category
              </th>
              <th className="px-4 py-4 text-left font-display text-xs uppercase tracking-wider text-muted-foreground hidden lg:table-cell">
                Social
              </th>
              <th className="px-4 py-4 text-left font-display text-xs uppercase tracking-wider text-muted-foreground hidden sm:table-cell">
                Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((business, index) => (
              <motion.tr
                key={business.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="border-b border-border/50 hover:bg-iron/30 transition-colors"
              >
                {/* Business Name & Website */}
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground text-sm">{business.name}</p>
                    {business.website && (
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-copper hover:text-copper-light text-xs flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span className="truncate max-w-[150px]">{business.website.replace("https://www.", "")}</span>
                      </a>
                    )}
                    <p className="text-muted-foreground text-xs truncate max-w-[200px] md:hidden">
                      {business.category}
                    </p>
                  </div>
                </td>

                {/* Contact Info */}
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <a
                      href={`mailto:${business.email}`}
                      className="text-foreground hover:text-copper text-xs flex items-center gap-1 transition-colors"
                    >
                      <Mail className="h-3 w-3 text-copper" />
                      <span className="truncate max-w-[150px]">{business.email}</span>
                    </a>
                    <a
                      href={`tel:${business.phone}`}
                      className="text-muted-foreground hover:text-copper text-xs flex items-center gap-1 transition-colors"
                    >
                      <Phone className="h-3 w-3" />
                      <span>{business.phone}</span>
                    </a>
                  </div>
                </td>

                {/* Category */}
                <td className="px-4 py-4 hidden md:table-cell">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
                    {business.category}
                  </span>
                </td>

                {/* Social Media */}
                <td className="px-4 py-4 hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    {Object.entries(business.socialMedia).map(([platform, url]) =>
                      url ? (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-copper transition-colors p-1"
                        >
                          {getSocialIcon(platform)}
                        </a>
                      ) : null
                    )}
                    {!Object.values(business.socialMedia).some(Boolean) && (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </div>
                </td>

                {/* Rating */}
                <td className="px-4 py-4 hidden sm:table-cell">
                  {business.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-brass fill-brass" />
                      <span className="text-foreground text-sm font-medium">{business.rating}</span>
                      <span className="text-muted-foreground text-xs">({business.reviews})</span>
                    </div>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
