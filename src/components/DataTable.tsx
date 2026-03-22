import { useState } from "react";
import { motion } from "framer-motion";
import { BusinessData } from "@/types/business";
import { ExternalLink, Mail, Phone, Star, Facebook, Instagram, Twitter, Linkedin, CheckCircle, XCircle, AlertTriangle, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DataTableProps {
  data: BusinessData[];
}

type ContactFilter = "all" | "contactable" | "email-only" | "phone-only" | "missing";

const getEmailStatus = (business: BusinessData) => {
  if (business.email && business.email.length > 0) return "found";
  if (business.website) return "not-found";
  return "missing";
};

export const DataTable = ({ data }: DataTableProps) => {
  const [filter, setFilter] = useState<ContactFilter>("all");

  if (data.length === 0) return null;

  const filteredData = data.filter((b) => {
    switch (filter) {
      case "contactable": return b.email || b.phone;
      case "email-only": return !!b.email;
      case "phone-only": return !!b.phone && !b.email;
      case "missing": return !b.email && !b.phone;
      default: return true;
    }
  });

  const stats = {
    total: data.length,
    withEmail: data.filter(b => b.email).length,
    withPhone: data.filter(b => b.phone).length,
    contactable: data.filter(b => b.email || b.phone).length,
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook": return <Facebook className="h-4 w-4" />;
      case "instagram": return <Instagram className="h-4 w-4" />;
      case "twitter": return <Twitter className="h-4 w-4" />;
      case "linkedin": return <Linkedin className="h-4 w-4" />;
      default: return null;
    }
  };

  const EmailStatusBadge = ({ business }: { business: BusinessData }) => {
    const status = getEmailStatus(business);
    if (status === "found") {
      return (
        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 gap-1">
          <CheckCircle className="h-3 w-3" /> Found
        </Badge>
      );
    }
    if (status === "not-found") {
      return (
        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 gap-1">
          <AlertTriangle className="h-3 w-3" /> Not Found
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 gap-1">
        <XCircle className="h-3 w-3" /> No Source
      </Badge>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="industrial-panel rounded-xl overflow-hidden"
    >
      {/* Contact Stats Bar */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-iron/30 border-b border-border text-xs">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Button size="sm" variant={filter === "all" ? "default" : "ghost"} className="h-7 text-xs" onClick={() => setFilter("all")}>
          All ({stats.total})
        </Button>
        <Button size="sm" variant={filter === "contactable" ? "default" : "ghost"} className="h-7 text-xs" onClick={() => setFilter("contactable")}>
          ✅ Contactable ({stats.contactable})
        </Button>
        <Button size="sm" variant={filter === "email-only" ? "default" : "ghost"} className="h-7 text-xs" onClick={() => setFilter("email-only")}>
          📧 Has Email ({stats.withEmail})
        </Button>
        <Button size="sm" variant={filter === "phone-only" ? "default" : "ghost"} className="h-7 text-xs" onClick={() => setFilter("phone-only")}>
          📞 Phone Only ({data.filter(b => b.phone && !b.email).length})
        </Button>
        <Button size="sm" variant={filter === "missing" ? "default" : "ghost"} className="h-7 text-xs" onClick={() => setFilter("missing")}>
          ❌ No Contact ({data.filter(b => !b.email && !b.phone).length})
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-iron/50 border-b border-border">
              <th className="px-4 py-4 text-left font-display text-xs uppercase tracking-wider text-muted-foreground">Business</th>
              <th className="px-4 py-4 text-left font-display text-xs uppercase tracking-wider text-muted-foreground">Contact</th>
              <th className="px-4 py-4 text-left font-display text-xs uppercase tracking-wider text-muted-foreground hidden md:table-cell">Email Status</th>
              <th className="px-4 py-4 text-left font-display text-xs uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Social</th>
              <th className="px-4 py-4 text-left font-display text-xs uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((business, index) => {
              const isContactable = business.email || business.phone;
              return (
                <motion.tr
                  key={business.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`border-b border-border/50 transition-colors ${
                    isContactable
                      ? "hover:bg-emerald-500/5 border-l-2 border-l-emerald-500/40"
                      : "hover:bg-iron/30 border-l-2 border-l-red-500/30 opacity-70"
                  }`}
                >
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground text-sm">{business.name}</p>
                      {business.website && (
                        <a href={business.website} target="_blank" rel="noopener noreferrer"
                          className="text-copper hover:text-copper-light text-xs flex items-center gap-1 transition-colors">
                          <ExternalLink className="h-3 w-3" />
                          <span className="truncate max-w-[150px]">{business.website.replace("https://www.", "")}</span>
                        </a>
                      )}
                      <p className="text-muted-foreground text-xs truncate max-w-[200px]">{business.category}</p>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      {business.email ? (
                        <a href={`mailto:${business.email}`}
                          className="text-emerald-400 hover:text-emerald-300 text-xs flex items-center gap-1 transition-colors">
                          <Mail className="h-3 w-3" />
                          <span className="truncate max-w-[150px]">{business.email}</span>
                        </a>
                      ) : (
                        <span className="text-muted-foreground/50 text-xs flex items-center gap-1">
                          <Mail className="h-3 w-3" /> No email
                        </span>
                      )}
                      {business.phone ? (
                        <a href={`tel:${business.phone}`}
                          className="text-muted-foreground hover:text-copper text-xs flex items-center gap-1 transition-colors">
                          <Phone className="h-3 w-3" />
                          <span>{business.phone}</span>
                        </a>
                      ) : (
                        <span className="text-muted-foreground/50 text-xs flex items-center gap-1">
                          <Phone className="h-3 w-3" /> No phone
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-4 hidden md:table-cell">
                    <EmailStatusBadge business={business} />
                  </td>

                  <td className="px-4 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      {Object.entries(business.socialMedia).map(([platform, url]) =>
                        url ? (
                          <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-copper transition-colors p-1">
                            {getSocialIcon(platform)}
                          </a>
                        ) : null
                      )}
                      {!Object.values(business.socialMedia).some(Boolean) && (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </div>
                  </td>

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
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};